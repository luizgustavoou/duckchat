import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private sessionsService: SessionsService) { }

    async validateUser(username: string, pass: string) {

    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if (!user) throw new NotFoundException("Usuário não encontrado")

        if (user.password !== pass) throw new UnauthorizedException();

        const payload = { sub: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, avatarURL: user.avatarURL };

        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: "24h" });

        this.sessionsService.create({ accessToken: access_token, refreshToken: refresh_token, userId: user.id });

        console.log(user.id);

        return {
            access_token,
            refresh_token
        };
    }

    async signUp(signUpDto: SignUpDto) {
        const result = await this.usersService.findOneByUsername(signUpDto.username);

        if (result) throw new ConflictException("Campo username já existe");

        const user = await this.usersService.create(signUpDto);

        return user;
    }
}
