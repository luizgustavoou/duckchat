import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipModule } from 'src/friendship/friendship.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), FriendshipModule, UsersModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
