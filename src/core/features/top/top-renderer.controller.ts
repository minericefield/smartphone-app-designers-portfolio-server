import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class TopRendererController {
  @Get()
  @Render('top')
  root() {
    return { message: 'Hello World!!!' };
  }
}
