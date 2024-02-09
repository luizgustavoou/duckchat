import {
  authRepository,
  messageRepository,
  userRepository,
} from "@/repositories";
import { AuthServiceImpl, IAuthService } from "./auth/auth.service";
import { IUserService, UserServiceImpl } from "./user/user.service";
import { IMessageService, MessageServiceImpl } from "./message/message.service";
import { IStorageService, StorageServiceImpl } from "./storage/storage.service";
import { JWTService, JWTServiceImpl } from "./jwt/jwt.service";

const storageService: IStorageService = new StorageServiceImpl();

const authService: IAuthService = new AuthServiceImpl(
  authRepository,
  storageService
);

const userService: IUserService = new UserServiceImpl(userRepository);

const messageService: IMessageService = new MessageServiceImpl(
  messageRepository
);

const jwtService: JWTService = new JWTServiceImpl();

export { authService, userService, messageService, storageService, jwtService };
