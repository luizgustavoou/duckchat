import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionsService {
  constructor(@InjectRepository(Session)
  private sessionsRepository: Repository<Session>) { }

  async create(createSessionDto: CreateSessionDto) {
    const session = await this.sessionsRepository.save(createSessionDto);
    return session;
  }

  async findAll() {
    const sessions = await this.sessionsRepository.find();

    return sessions;
  }

  async findOneById(id: string) {
    return await this.sessionsRepository.findOneBy({ id });

  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const session = await this.sessionsRepository.update(id, updateSessionDto);

    return session;

  }

  async remove(id: string) {
    await this.sessionsRepository.delete(id);
  }
}
