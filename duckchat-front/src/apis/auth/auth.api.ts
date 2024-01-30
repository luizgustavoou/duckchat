import { api } from "@/utils/api";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignup } from "../../../interfaces/ISignup";

import { IAuthResponse } from "./models/IAuthResponse";
import { IUserResponse } from "./models/IUserResponse";

export interface IAuthApi {
  signin(data: ISignin): Promise<IAuthResponse>;

  signup(data: ISignup): Promise<IUserResponse>;
}

export class AuthApiImpl implements IAuthApi {
  async signup(signupData: ISignup): Promise<IUserResponse> {
    const res = await api.post<IUserResponse>("/auth/signup", signupData);

    const data = res.data;

    return data;
  }

  async signin(signinData: ISignin): Promise<IAuthResponse> {
    const res = await api.post<IAuthResponse>("/auth/signin", signinData);

    const data = res.data;

    return data;
  }
}
