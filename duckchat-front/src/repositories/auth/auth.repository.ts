import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignup } from "../../../interfaces/ISignup";
import { IUser } from "@/entities/IUser";

export interface IAuthRepository {
  signin(signinData: ISignin): Promise<IAuth>;

  signup(signupData: ISignup): Promise<IUser>;
}

export class AuthRepositoryImpl implements IAuthRepository {
  signup(signupData: ISignup): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  signin(signinData: ISignin): Promise<IAuth> {
    throw new Error("Method not implemented.");
  }
}
