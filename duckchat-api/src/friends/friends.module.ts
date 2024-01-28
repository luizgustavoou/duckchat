import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserFriends } from './entities/user_friends.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserFriends]), UsersModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
