import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedException } from '../exceptions/authenticated.exception';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const isAuthenticated = request.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      throw new AuthenticatedException();
    }
  }
}
