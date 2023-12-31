import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }


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

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto);

    return user;
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
