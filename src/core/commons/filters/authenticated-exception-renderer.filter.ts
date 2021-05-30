import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticatedException } from '../exceptions/authenticated.exception';

@Catch(AuthenticatedException)
export class AuthenticatedExceptionRendererFilter implements ExceptionFilter {
  catch(_: AuthenticatedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.redirect('/auth');
  }
}
