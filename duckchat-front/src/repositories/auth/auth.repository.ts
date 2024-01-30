import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignup } from "../../../interfaces/ISignup";
import { IUser } from "@/entities/IUser";
import { IAuthApi } from "@/apis/auth/auth.api";

export interface IAuthRepository {
  signin(signinData: ISignin): Promise<IAuth>;

  signup(signupData: ISignup): Promise<IUser>;
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private authApi: IAuthApi) {}

  async signup(signupData: ISignup): Promise<IUser> {
    const res = await this.authApi.signup(signupData);

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

  async signin(signinData: ISignin): Promise<IAuth> {
    const res = await this.authApi.signin(signinData);

    const newRes: IAuth = {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    };

    return newRes;signinData
  }
}
