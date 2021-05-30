import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class MeInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const { user } = ctx.switchToHttp().getRequest<Request>();

    return next.handle().pipe(map((data) => ({ ...data, me: user })));
  }
}
