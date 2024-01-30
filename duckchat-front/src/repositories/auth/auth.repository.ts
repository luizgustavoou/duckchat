import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignout } from "../../../interfaces/ISignout";
import { IUser } from "@/entities/IUser";

export interface IAuthRepository {
  signin(data: ISignin): Promise<IAuth>;

  signout(data: ISignout): Promise<IUser>;
}

export class AuthRepositoryImpl implements IAuthRepository {
  signout(data: ISignout): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  signin(data: ISignin): Promise<IAuth> {
    throw new Error("Method not implemented.");
  }
}
