import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { FriendshipService } from '../friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { FindAllByFriendshipIdDto } from './dto/find-all-by-friendshipId.dto';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private friendshipService: FriendshipService,
    private usersService: UsersService,
    private ghatGateway: ChatGateway,
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const { content, friendshipId } = createMessageDto;

    const friendship = await this.friendshipService.findOneById(friendshipId);
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrada.');
    }

    if (!friendship) {
      throw new NotFoundException('Amizade não encontrada.');
    }

    const message = await this.messageRepository.save({
      content,
      userFriends: friendship,
      user: user,
    });

    this.ghatGateway.emitMessageToFriendship(friendshipId, {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    });

    return message;
  }

  async findAll() {
    const messages = await this.messageRepository.find({
      order: { createdAt: 'ASC' },
    });
    return messages;
  }

  async findAllByFriendshipId(
    findAllByFriendshipIdDto: FindAllByFriendshipIdDto,
  ) {
    const { friendshipId } = findAllByFriendshipIdDto;

    const messages = await this.messageRepository.find({
      where: { userFriends: { id: friendshipId } },
      order: { createdAt: 'ASC' },
    });

    return messages;
  }

  async findOneById(id: string) {
    return await this.messageRepository.findOneBy({ id });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const user = await this.messageRepository.update(id, updateMessageDto);

    return user;
  }

  async remove(id: string) {
    await this.messageRepository.delete(id);
  }
}
