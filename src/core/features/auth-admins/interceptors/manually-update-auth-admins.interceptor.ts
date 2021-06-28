import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs/operators';

import { LocalAuthGuard } from '../guards/local-auth.guard';

@Injectable()
export class ManuallyUpdateAuthAdminsInterceptor
  extends LocalAuthGuard
  implements NestInterceptor
{
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const request = ctx.switchToHttp().getRequest<Request>();

    // TODO: Typing with admin populated with role
    return next.handle().pipe(
      tap((admin) => {
        request.user = admin;
        super.logIn(request);
      }),
    );
  }
}
