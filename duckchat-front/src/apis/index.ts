import { AuthApiImpl, IAuthApi } from "./auth/auth.api";
import { IMessageApi, MessageApiImpl } from "./message/message.api";
import { IUserApi, UserApiImpl } from "./user/user.api";

const authApi: IAuthApi = new AuthApiImpl();

const userApi: IUserApi = new UserApiImpl();

const messageApi: IMessageApi = new MessageApiImpl();

export { authApi, userApi, messageApi };
