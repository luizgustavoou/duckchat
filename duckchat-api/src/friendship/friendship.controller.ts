import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post(':id')
  async addFriend(@Param('id') friendId: string, @Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.friendshipService.addFriend({ userId: sub, friendId });
  }

  @Get()
  async findAllFriendsOfUser(@Req() req: Request) {
    const { sub } = (<any>req).user;

    return await this.friendshipService.findAllFriendsOfUser({ userId: sub });
  }
}
