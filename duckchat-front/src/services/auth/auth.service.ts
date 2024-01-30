import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignup } from "../../../interfaces/ISignup";
import { IUser } from "@/entities/IUser";

export interface IAuthService {
  signin(signinData: ISignin): Promise<IAuth>;

  signup(signupData: ISignup): Promise<IUser>;
}

export class AuthServiceImpl implements IAuthService {
  signup(signupData: ISignup): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  signin(signinData: ISignin): Promise<IAuth> {
    throw new Error("Method not implemen ted.");
  }
}
