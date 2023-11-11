import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  async findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sessionsService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }

  @Delete('')
  async removeAll() {
    return this.sessionsService.removeAll();
  }
}
