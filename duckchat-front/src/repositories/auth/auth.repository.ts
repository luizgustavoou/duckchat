import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../interfaces/ISignin";
import { ISignup } from "../../interfaces/ISignup";
import { IUser } from "@/entities/IUser";
import { IAuthApi } from "@/apis/auth/auth.api";

export interface IAuthRepository {
  signin(data: ISignin): Promise<IAuth>;

  signup(data: ISignup): Promise<IUser>;
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private authApi: IAuthApi) {}

  async signup(data: ISignup): Promise<IUser> {
    const res = await this.authApi.signup(data);

    const newRes: IUser = {
      id: res.id,
      username: res.username,
      password: res.password,
      firstName: res.firstName,
      lastName: res.lastName,
      avatarURL: res.avatarURL,
    };

    return newRes;
  }

  async signin(data: ISignin): Promise<IAuth> {
    const res = await this.authApi.signin(data);

    const newRes: IAuth = {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    };

    return newRes;
  }
}
