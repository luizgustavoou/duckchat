import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
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
    signOut(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);

    }
    
}
