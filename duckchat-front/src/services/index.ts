import {
  authRepository,
  messageRepository,
  userRepository,
} from "@/repositories";
import { AuthServiceImpl, IAuthService } from "./auth/auth.service";
import { IUserService, UserServiceImpl } from "./user/user.service";
import { IMessageService, MessageServiceImpl } from "./message/message.service";
import { IStorageService, StorageServiceImpl } from "./storage/storage.service";
import { JWTService } from "./jwt/jwt.service";

const storageService: IStorageService = new StorageServiceImpl();

const authService: IAuthService = new AuthServiceImpl(
  authRepository,
  storageService
);

const userService: IUserService = new UserServiceImpl(userRepository);

const messageService: IMessageService = new MessageServiceImpl(
  messageRepository
);

const jwtService = new JWTService();

export { authService, userService, messageService, storageService, jwtService };
