import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignout } from "../../../interfaces/ISignout";
import { IUser } from "@/entities/IUser";

export interface IAuthService {
  signin(data: ISignin): Promise<IAuth>;

  signout(data: ISignout): Promise<IUser>;
}

export class AuthServiceImpl implements IAuthService {
  signout(data: ISignout): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  signin(data: ISignin): Promise<IAuth> {
    throw new Error("Method not implemen ted.");
  }
}
