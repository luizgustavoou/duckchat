import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  lastName: string;

  avatarURL: string;
}
