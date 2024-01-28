import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post(':id')
  async create(@Param('id') friendId: string, @Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.friendshipService.create({ userId: sub, friendId });
  }

  @Get()
  async findAllByUserId(@Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.friendshipService.findAllByUserId({ userId: sub });
  }

  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return await this.friendshipService.removeById({ id });
  }

  // @Delete('user/:id')
  // async removeByUsersId(@Req() req: Request, @Param('id') id: string) {
  //   const { sub } = (<any>req).user;

  //   return await this.friendshipService.removeByUsersId({
  //     user1Id: sub,
  //     user2Id: id,
  //   });
  // }
}
