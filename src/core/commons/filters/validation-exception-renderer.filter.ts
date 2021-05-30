import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { ValidationException } from '../exceptions/validation.exception';
import { storeToFlash } from '../helpers/flash.helper';

@Catch(ValidationException)
export class ValidationExceptionRendererFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { statusCode, ...messages } = exception.getResponseErrorFormatted();

    storeToFlash(request, {
      ...request.body,
      ...messages,
    });

    response.redirect(request.headers.referer);
  }
}
