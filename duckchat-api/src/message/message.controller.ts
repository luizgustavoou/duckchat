import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe()) createMessageDto: CreateMessageDto,
  ) {
    const { sub: userId } = (<any>req).user;
    const { content, friendshipId } = createMessageDto;

    return await this.messageService.create({ content, friendshipId }, userId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get('friendship/:id')
  async findAllByFriendshipId(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.messageService.findAllByFriendshipId({
      friendshipId: id,
    });
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.messageService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {

    return await this.messageService.remove(id);
  }
}
