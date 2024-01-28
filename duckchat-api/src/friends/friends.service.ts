import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFriends } from './entities/user_friends.entity';
import { AddFriendDto } from './dto/add-friend.dto';
import { UsersService } from '../users/users.service';
import { FindAllFriendsOfUser } from './dto/find-all-friends-of-user.dto';

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

    console.log({ user1, user2 });

    if (!user1) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user2) {
      throw new NotFoundException('Usuário a ser adicionado não encontrado');
    }

    if (user1.id === user2.id) {
      throw new BadRequestException(
        'Você não pode adicionar a si mesmo como amigo.',
      );
    }

    const friendship = await this.userFriendsRepository.save({ user1, user2 });

    return friendship;
  }

  async findAllFriendsOfUser(findAllFriendsOfUser: FindAllFriendsOfUser) {
    const { userId } = findAllFriendsOfUser;

    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const friends = await this.userFriendsRepository.find({
      relations: {
        user1: true,
        user2: true,
        messages: true,
      },
      where: [{ user1: { id: userId } }, { user2: { id: userId } }],
    });

    return friends;
  }
}
