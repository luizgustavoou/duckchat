import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MaxLength(255)
  content: string;

  @IsUUID()
  friendshipId: string;
}
