import { jwtDecode } from "jwt-decode";

export class JWTService {
  decode<T = any>(token: string): T {
    return jwtDecode(token);
  }
}
