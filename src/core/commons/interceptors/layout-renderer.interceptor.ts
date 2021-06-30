import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class LayoutRendererInterceptor implements NestInterceptor {
  constructor(private readonly layout: 'empty' | 'default') {}

  intercept(_: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(map((data) => ({ ...data, layout: this.layout })));
  }
}
