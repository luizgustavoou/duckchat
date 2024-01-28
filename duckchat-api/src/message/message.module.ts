import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipModule } from 'src/friendship/friendship.module';
import { UsersModule } from 'src/users/users.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    FriendshipModule,
    UsersModule,
    ChatModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
