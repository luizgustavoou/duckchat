import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignOutDto } from './dto/sign-out.dto';
import { Public } from 'src/decorators/public.decorator';


@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }


    @Post("signup")
    signOut(@Body() signOutDto: SignOutDto) {
        return this.authService.signOut(signOutDto);

    }
}
