import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { FlashService } from '../../../globals/services/flash.service';
import { LoginException } from '../exceptions/login.exception';

@Catch(LoginException)
export class LoginExceptionRendererFilter implements ExceptionFilter {
  constructor(private readonly flashService: FlashService) {}

  catch(exception: LoginException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.flashService.store(request, {
      ...request.body,
      errorMessage: exception.message,
    });

    response.redirect('/auth');
  }
}
