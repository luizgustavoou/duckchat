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
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/files/multer-config';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('profileimage', multerConfig))
  uploadFile(
    @Body() body: { name: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    profileimage: Express.Multer.File,
  ) {
    console.log({ body });
    return profileimage;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('profileImage', multerConfig))
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    profileImage: Express.Multer.File,
  ) {
    const { sub } = (<any>req).user;

    return await this.usersService.update(sub, {
      ...updateUserDto,
      avatarURL: profileImage?.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(id);
  }
}
