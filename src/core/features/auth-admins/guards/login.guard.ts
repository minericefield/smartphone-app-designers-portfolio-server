import { ExecutionContext, Injectable } from '@nestjs/common';

import { LoginException } from '../exceptions/login.exception';

import { LocalAuthGuard } from './local-auth.guard';

@Injectable()
export class LoginGuard extends LocalAuthGuard {
  async canActivate(context: ExecutionContext) {
    let result = false;

    try {
      result = (await super.canActivate(context)) as boolean;
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    } catch (_) {
      throw new LoginException();
    }

    return result;
  }
}
