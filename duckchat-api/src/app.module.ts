import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModuleTeste } from './chatTeste/chat.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ChatModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'duckchat-mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'dbDuck',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    AuthModule,
    SessionsModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
