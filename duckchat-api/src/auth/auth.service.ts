import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignOutDto } from './dto/sign-out.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string) {

    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if (!user) throw new NotFoundException("Usuário não encontrado")

        if (user.password !== pass) throw new UnauthorizedException();

        const payload = { sub: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, avatarURL: user.avatarURL };

        const access_token = await this.jwtService.signAsync(payload);

        return {
            access_token
        };
    }

    async signOut(signOutDto: SignOutDto) {
        const result = await this.usersService.findOneByUsername(signOutDto.username);

        if (result) throw new ConflictException("Campo username já existe");

        const user = await this.usersService.create(signOutDto);

        return user;
    }
}
