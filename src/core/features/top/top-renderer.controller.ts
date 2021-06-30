import {
  Controller,
  Get,
  Render,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { AuthenticatedExceptionRendererFilter } from '../../commons/filters/authenticated-exception-renderer.filter';
import { AuthenticatedGuard } from '../../commons/guards/authenticated.guard';
import { MeInterceptor } from '../../commons/interceptors/me.interceptor';

@Controller()
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthenticatedExceptionRendererFilter)
export class TopRendererController {
  @Get()
  @UseInterceptors(MeInterceptor)
  @Render('top')
  root() {
    return;
  }
}
