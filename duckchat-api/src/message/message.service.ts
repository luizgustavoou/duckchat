import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { content, friendship } = createMessageDto;

    const message = await this.messageRepository.save({
      content,
      userFriends: friendship,
    });

    return message;
  }

  async findAll() {
    const messages = await this.messageRepository.find();
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
