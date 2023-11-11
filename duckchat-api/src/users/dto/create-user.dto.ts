import { User } from "../entities/user.entity";

export class CreateUserDto {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarURL: string;
}

