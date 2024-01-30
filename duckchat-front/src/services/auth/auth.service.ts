import { IAuth } from "@/entities/IAuth";
import { ISignin } from "../../../interfaces/ISignin";
import { ISignup } from "../../../interfaces/ISignup";
import { IUser } from "@/entities/IUser";
import { IAuthRepository } from "@/repositories/auth/auth.repository";
import { IStorageService } from "../storage/storage.service";

export interface IAuthService {
  signin(signinData: ISignin): Promise<IAuth>;

  signup(signupData: ISignup): Promise<IUser>;
}

export class AuthServiceImpl implements IAuthService {
  constructor(
    private authRepository: IAuthRepository,
    private storageService: IStorageService
  ) {}

  async signup(signupData: ISignup): Promise<IUser> {
    try {
      const res = await this.authRepository.signup(signupData);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async signin(signinData: ISignin): Promise<IAuth> {
    try {
      const res = await this.authRepository.signin(signinData);

      this.storageService.setItem("accessToken", res.accessToken);
      this.storageService.setItem("refreshToken", res.refreshToken);
      
      return res;
    } catch (error) {
      throw error;
    }
  }
}
