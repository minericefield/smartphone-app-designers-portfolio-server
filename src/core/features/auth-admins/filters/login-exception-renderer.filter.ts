import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { storeToFlash } from '../../../commons/helpers/flash.helper';
import { LoginException } from '../exceptions/login.exception';

@Catch(LoginException)
export class LoginExceptionRendererFilter implements ExceptionFilter {
  catch(exception: LoginException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    storeToFlash(request, {
      ...request.body,
      errorMessage: exception.message,
    });

    response.redirect('/auth');
  }
}
