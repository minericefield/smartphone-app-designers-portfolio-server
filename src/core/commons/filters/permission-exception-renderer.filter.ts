import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

import { PermissionException } from '../exceptions/permission.exception';

@Catch(PermissionException)
export class PermissionExceptionRendererFilter implements ExceptionFilter {
  catch(_: PermissionException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.redirect('/permission_denied');
  }
}
