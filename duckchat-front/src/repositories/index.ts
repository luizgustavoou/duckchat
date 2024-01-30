import { authApi } from "@/apis";
import { AuthRepositoryImpl, IAuthRepository } from "./auth/auth.repository";

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi);

export { authRepository };
