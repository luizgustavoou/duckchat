import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserFriends } from 'src/friendship/entities/user_friends.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserFriends)
    private userFriendsRepository: Repository<UserFriends>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto);

    return user;
  }

  async findNonFriends(userId: string) {
    /*
    QUERY:

    SELECT user.id, user.firstName
    FROM user
    WHERE user.id != ${userId} AND user.id NOT IN
    (
      SELECT
      CASE
        WHEN user_friends.user1Id = ${userId} THEN user_friends.user2Id
        ELSE user_friends.user1Id
      END
      FROM user_friends
      WHERE user_friends.user1Id = ${userId} OR user_friends.user2Id = ${userId}
    );
    */
    const subquery = this.userFriendsRepository
      .createQueryBuilder('user_friends')
      .select(
        'CASE WHEN user_friends.user1Id = :userId THEN user_friends.user2Id ELSE user_friends.user1Id END',
        'friendId',
      )
      .where(
        'user_friends.user1Id = :userId OR user_friends.user2Id = :userId',
      );

    const query = this.usersRepository
      .createQueryBuilder('user')
      // .select(['user.id', 'user.firstName'])
      .where('user.id != :userId')
      .andWhere(`user.id NOT IN (${subquery.getQuery()})`)
      .setParameters({ userId })
      .getMany();

    return query;
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
