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
    const { userId, ...session } = createSessionDto;

    const newSession = await this.sessionsRepository.save({ ...session, user: { id: userId } });
    return newSession;
  }

  async findAll() {
    // const newSession = await this.sessionsRepository.find({ relations: ['user'], select: { user: { id: true } } });
    const newSession = await this.sessionsRepository.find();


    return newSession;
  }

  async findOneById(id: string) {
    return await this.sessionsRepository.findOneBy({ id });

  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const newSession = await this.sessionsRepository.update(id, updateSessionDto);

    return newSession;

  }

  async remove(id: string) {
    await this.sessionsRepository.delete(id);
  }

  async removeAll() {
    await this.sessionsRepository.clear()
  }
}
