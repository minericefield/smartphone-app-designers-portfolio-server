import {
  Controller,
  Get,
  Render,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { Flash } from '../../commons/decorators/flash.decorator';
import { AuthenticatedExceptionRendererFilter } from '../../commons/filters/authenticated-exception-renderer.filter';
import { AuthenticatedGuard } from '../../commons/guards/authenticated.guard';
import { FlashData } from '../../commons/helpers/flash.helper';
import { MeInterceptor } from '../../commons/interceptors/me.interceptor';

@Controller()
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthenticatedExceptionRendererFilter)
export class TopRendererController {
  @Get()
  @UseInterceptors(MeInterceptor)
  @Render('top')
  root(@Flash() flashData: FlashData) {
    return flashData;
  }
}
