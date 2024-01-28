import { UserFriends } from "src/friendship/entities/user_friends.entity";

export class CreateMessageDto {
  content: string;
  friendshipId: string
}
