import { ISignin } from "../../../interfaces/ISignin";
import { ISignout } from "../../../interfaces/ISignout";

import { IAuthResponse } from "./models/IAuthResponse";
import { IUserResponse } from "./models/IUserResponse";

export interface IAuthApi {
  signin(data: ISignin): Promise<IAuthResponse>;

  signout(data: ISignout): Promise<IUserResponse>;
}

export class AuthApiImpl implements IAuthApi {
  signout(data: ISignout): Promise<IUserResponse> {
    throw new Error("Method not implemented.");
  }

  signin(data: ISignin): Promise<IAuthResponse> {
    throw new Error("Method not implemented.");
  }
}
