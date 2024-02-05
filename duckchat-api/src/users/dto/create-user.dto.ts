import { IsString, MaxLength, MinLength } from 'class-validator';

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

  @IsString()
  @MaxLength(30)
  about: string;

  avatarURL: string;
}
