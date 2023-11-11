import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @Post("signin")
    async signIn(@Body() signInDto: Record<string, any>) {
        return await this.authService.signIn(signInDto.username, signInDto.password);
    }


    @Post("signup")
    async signOut(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }
    
    @Post("refresh")
    async refresh(@Body() body: RefreshDto) {
        console.log({ body })
        return "hello.";
    }
}
