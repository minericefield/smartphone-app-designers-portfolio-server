import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { FlashInterceptor } from './interceptors/flash.interceptor';
import { FlashService } from './services/flash.service';

@Global()
@Module({
  providers: [
    FlashService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FlashInterceptor,
    },
  ],
  exports: [FlashService],
})
export class GlobalsModule {}
