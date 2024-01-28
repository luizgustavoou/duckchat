import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post(':id')
  async addFriend(@Param('id') friendId: string, @Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.friendsService.addFriend({ userId: sub, friendId });
  }

  @Get()
  async findAllFriendsOfUser(@Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.friendsService.findAllFriendsOfUser({ userId: sub });
  }
}
