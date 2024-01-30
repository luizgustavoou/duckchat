import { AuthApiImpl, IAuthApi } from "./auth/auth.api";

const authApi: IAuthApi = new AuthApiImpl();

export { authApi };
