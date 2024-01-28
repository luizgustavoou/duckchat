import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipModule } from 'src/friendship/friendship.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), FriendshipModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
