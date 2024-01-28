import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFriends } from './entities/user_friends.entity';
import { AddFriendDto } from './dto/add-friend.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(UserFriends)
    private userFriendsRepository: Repository<UserFriends>,
    private readonly usersService: UsersService,
  ) {}

  async addFriend(addFriendDto: AddFriendDto) {
    const { friendId, userId } = addFriendDto;

    const user1 = await this.usersService.findOneById(userId);

    const user2 = await this.usersService.findOneById(friendId);

    if (!user1) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user2) {
      throw new NotFoundException('Usuário a ser adicionado não encontrado');
    }

    console.log({ user1, user2 });
  }
}
