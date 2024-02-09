import { jwtDecode } from "jwt-decode";

export interface JWTService {
  decode<T = any>(token: string): T;
}
export class JWTServiceImpl implements JWTService {
  decode<T = any>(token: string): T {
    return jwtDecode(token);
  }
}
