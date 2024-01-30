import { authRepository } from "@/repositories";
import { AuthServiceImpl, IAuthService } from "./auth/auth.service";

const authService: IAuthService = new AuthServiceImpl(authRepository);

export { authService };
