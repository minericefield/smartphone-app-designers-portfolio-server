import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';

import { LayoutRendererInterceptor } from '../../commons/interceptors/layout-renderer.interceptor';

@Controller()
export class RolesRendererController {
  @Get('permission_denied')
  @UseInterceptors(new LayoutRendererInterceptor('empty'))
  @Render('permission_denied')
  root() {
    return {
      layout: 'empty',
    };
  }
}
