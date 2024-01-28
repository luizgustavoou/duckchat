import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFriends } from './entities/user_friends.entity';
import { AddFriendDto } from './dto/add-friend.dto';
import { UsersService } from '../users/users.service';
import { FindAllFriendsOfUser } from './dto/find-all-friends-of-user.dto';
import { User } from 'src/users/entities/user.entity';
import { findFriendshipByUsersId } from './dto/find-friendship-by-users-id.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(UserFriends)
    private userFriendsRepository: Repository<UserFriends>,
    private readonly usersService: UsersService,
  ) {}

  async addFriend(addFriendDto: AddFriendDto) {
    const { friendId, userId } = addFriendDto;

    if (friendId === userId) {
      throw new BadRequestException(
        'Você não pode adicionar a si mesmo como amigo.',
      );
    }

    const user1 = await this.usersService.findOneById(userId);

    const user2 = await this.usersService.findOneById(friendId);

    if (!user1) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user2) {
      throw new NotFoundException('Usuário a ser adicionado não encontrado');
    }

    const friendship = await this.findFriendshipByUsersId({
      user1Id: user1.id,
      user2Id: user2.id,
    });

    if (friendship.length > 0) {
      throw new ConflictException('Usuário a ser adicionado já é seu amigo.');
    }

    const newFriendship = await this.userFriendsRepository.save({
      user1,
      user2,
    });

    return newFriendship;
  }

  async findAllFriendsOfUser(
    findAllFriendsOfUser: FindAllFriendsOfUser,
  ): Promise<User[]> {
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

    const friendsFormatted = friends.map((friend) => {
      if (friend.user1.id != userId) return friend.user1;

      return friend.user2;
    });

    return friendsFormatted;
  }

  async findFriendshipByUsersId(
    findFriendshipByUsersId: findFriendshipByUsersId,
  ) {
    const { user1Id, user2Id } = findFriendshipByUsersId;

    const friendship = await this.userFriendsRepository.find({
      where: [
        { user1: { id: user1Id }, user2: { id: user2Id } },
        { user1: { id: user2Id }, user2: { id: user1Id } },
      ],
    });

    return friendship;
  }
}
