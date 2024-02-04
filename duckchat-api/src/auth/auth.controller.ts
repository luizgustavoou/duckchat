import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from 'src/decorators/public.decorator';
import { SigninDto } from './dto/signin.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body(new ValidationPipe()) signInDto: SigninDto) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Post('signup')
  async signOut(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('refresh')
  async refresh(@Body(new ValidationPipe()) body: RefreshDto) {
    return await this.authService.refreshTokens(body);
  }
}
