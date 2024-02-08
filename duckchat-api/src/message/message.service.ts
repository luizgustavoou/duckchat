import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository, UpdateResult } from 'typeorm';
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
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!friendship) {
      throw new NotFoundException('Amizade não encontrada.');
    }

    const message = await this.messageRepository.save({
      content,
      userFriends: friendship,
      user: user,
    });

    this.ghatGateway.emitMessageToFriendship({
      friendshipId,
      type: 'message_created',
      message: {
        id: message.id,
        user: {
          id: message.user.id,
          username: message.user.username,
          password: message.user.password,
          firstName: message.user.firstName,
          lastName: message.user.lastName,
          avatarURL: message.user.avatarURL,
          created_at: message.user.createdAt,
          updated_at: message.user.updatedAt,
        },
        content: message.content,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      },
    });

    return message;
  }

  async findAll() {
    const messages = await this.messageRepository.find({
      relations: {
        user: true,
      },
      order: { createdAt: 'ASC' },
    });
    return messages;
  }

  async findAllByFriendshipId(
    findAllByFriendshipIdDto: FindAllByFriendshipIdDto,
  ) {
    const { friendshipId } = findAllByFriendshipIdDto;

    const messages = await this.messageRepository.find({
      relations: {
        user: true,
      },
      where: { userFriends: { id: friendshipId } },
      order: { createdAt: 'ASC' },
    });

    return messages;
  }

  async findOneById(id: string) {
    return await this.messageRepository.findOneBy({ id });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { userFriends: true, user: true },
    });

    if (!message) {
      throw new NotFoundException('Mensagem não encontrado.');
    }

    this.messageRepository.merge(message, updateMessageDto);

    await this.ghatGateway.emitMessageToFriendship({
      friendshipId: message.userFriends.id,
      type: 'message_updated',
      message: {
        id: message.id,
        user: {
          id: message.user.id,
          username: message.user.username,
          password: message.user.password,
          firstName: message.user.firstName,
          lastName: message.user.lastName,
          avatarURL: message.user.avatarURL,
          created_at: message.user.createdAt,
          updated_at: message.user.updatedAt,
        },
        content: message.content,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      },
    });

    return await this.messageRepository.save(message);
  }

  async remove(id: string) {
    console.log(
      `[LOG remove from message.service.ts] Iniciando a deleção da entidade com id ${id}`,
    );

    // TODO: Ao remover mensagem não precisa enviar o usuario que comentou e nem o ocnteudo da mensagem. Basta enviar o id da mensagem para o front saber o que fazer.
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { userFriends: true, user: true },
    });

    if (!message) {
      throw new NotFoundException('Mensagem não encontrada.');
    }

    await this.messageRepository.delete(id);

    await this.ghatGateway.emitMessageToFriendship({
      friendshipId: message.userFriends.id,
      type: 'message_removed',
      message: {
        id: message.id,
        user: {
          id: message.user.id,
          username: message.user.username,
          password: message.user.password,
          firstName: message.user.firstName,
          lastName: message.user.lastName,
          avatarURL: message.user.avatarURL,
          created_at: message.user.createdAt,
          updated_at: message.user.updatedAt,
        },
        content: message.content,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      },
    });

    console.log(`[LOG remove from message.service.ts] Mensagem deletada!`);

    return { id: message.id };
  }
}
