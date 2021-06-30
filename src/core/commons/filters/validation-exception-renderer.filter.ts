import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { FlashService } from '../../globals/services/flash.service';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionRendererFilter implements ExceptionFilter {
  constructor(private readonly flashService: FlashService) {}

  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { statusCode, ...messages } = exception.getResponseErrorFormatted();

    this.flashService.store(request, {
      ...request.body,
      ...messages,
    });

    response.redirect(request.headers.referer);
  }
}
