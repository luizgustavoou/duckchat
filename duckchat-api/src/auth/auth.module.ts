import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [SessionsModule, UsersModule, JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: "60s" } })],
  controllers: [AuthController,],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule { }
