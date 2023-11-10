import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();


    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }


    return true;

  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = (<any>request.headers).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoibHVpemd1c3Rhdm9vdSIsImZpcnN0TmFtZSI6Ikx1aXoiLCJsYXN0TmFtZSI6IlVtYmVsaW5vIiwiYXZhdGFyVVJMIjoidXJsIiwiaWF0IjoxNjk5NjUyOTQ2LCJleHAiOjE2OTk2NTMwMDZ9.yugpXlwxJiu3IUwrpGF4xjHRHeqFSPXmjA1Eda2abNs