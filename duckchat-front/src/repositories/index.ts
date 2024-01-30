import { authApi, messageApi, userApi } from "@/apis";
import { AuthRepositoryImpl, IAuthRepository } from "./auth/auth.repository";
import { IUserRepository, UserRepositoryImpl } from "./user/user.repository";
import {
  IMessageRepository,
  MessageRepositoryImpl,
} from "./message/message.repository";

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi);

const userRepository: IUserRepository = new UserRepositoryImpl(userApi);

const messageRepository: IMessageRepository = new MessageRepositoryImpl(
  messageApi
);

export { authRepository, userRepository, messageRepository };
