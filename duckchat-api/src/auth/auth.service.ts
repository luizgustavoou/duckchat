import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { RefreshDto } from './dto/refresh.dto';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/users/types/userProfile';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private sessionsService: SessionsService) { }

    async validateUser(username: string, pass: string) {

    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if (!user) throw new NotFoundException("Usuário não encontrado")

        const { password, sessions, ...userProfile } = user;

        if (password !== pass) throw new UnauthorizedException("Senha incorreta");


        const { } = user;
        const { accessToken, refreshToken } = await this.getTokens(userProfile);


        this.sessionsService.create({ accessToken: accessToken, refreshToken: refreshToken, userId: user.id });

        return { accessToken, refreshToken };

    }

    async signUp(signUpDto: SignUpDto) {
        const result = await this.usersService.findOneByUsername(signUpDto.username);

        if (result) throw new ConflictException("Campo username já existe");

        const user = await this.usersService.create(signUpDto);

        return user;
    }

    async refreshTokens(refreshDto: RefreshDto) {
        const session = await this.sessionsService.findOneByUserIdAndRefreshToken(refreshDto.userId, refreshDto.refresh_token);

        if (!session) throw new UnauthorizedException("Sessão não encontrada");


        const { password, sessions, ...userProfile } = session.user;

        const { accessToken, refreshToken } = await this.getTokens(userProfile);

        await this.sessionsService.update(session.id, { accessToken, refreshToken });

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };

    }

    private async getTokens(user: UserProfile) {
        const payload = { sub: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, avatarURL: user.avatarURL };


        const [accessToken, refreshToken] = await Promise.all([await this.jwtService.signAsync(payload, { expiresIn: "60s" }), await this.jwtService.signAsync(payload, { expiresIn: "24h" })]);

        return { accessToken, refreshToken };

    }
}
