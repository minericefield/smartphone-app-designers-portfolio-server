import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';

import { FlashService } from '../services/flash.service';

@Injectable()
export class FlashInterceptor implements NestInterceptor {
  constructor(private readonly flashService: FlashService) {}

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const request = ctx.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        if (request.method.toLowerCase() === 'get') {
          const flashData = this.flashService.restore(request);
          return {
            ...data,
            ...flashData,
          };
        } else {
          return data;
        }
      }),
    );
  }
}
