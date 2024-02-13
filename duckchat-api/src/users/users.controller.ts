import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('non-friends')
  async findAllNonFriendsUsers(@Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.usersService.findAllNonFriendsUsers(sub);
  }

  @Get('non-friends/search/:value')
  async findNonFriendsUsersBySearch(
    @Req() req: Request,
    @Param('value') value: string,
  ) {
    const { sub } = (<any>req).user;

    return await this.usersService.findNonFriendsUsersBySearch(sub, value);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.usersService.update(sub, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(id);
  }
}
