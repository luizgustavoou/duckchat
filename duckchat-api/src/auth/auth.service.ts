import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignOutDto } from './dto/sign-out.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if (!user) throw new NotFoundException("Usuário não encontrado")

        if (user.password !== pass) throw new UnauthorizedException();

        const { password, ...result } = user;

        return result;
    }

    async signOut(signOutDto: SignOutDto) {
        const result = await this.usersService.findOneByUsername(signOutDto.username);

        if (result) throw new ConflictException("Campo username já existe");

        const user = await this.usersService.create(signOutDto);

        return user;
    }
}
