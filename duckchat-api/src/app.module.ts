import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'dbDuck',
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: true,
  }), AuthModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
