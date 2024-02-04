import { IsString, IsUUID } from 'class-validator';

export class RefreshDto {
  @IsUUID()
  userId: string;

  @IsString()
  refresh_token: string;
}
