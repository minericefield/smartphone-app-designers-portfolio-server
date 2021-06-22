import { Controller, Get } from '@nestjs/common';
import { Response$FetchDesigner$Status$200 } from 'smartphone-app-designers-portfolio-api-docs/server';

import { DesignerService } from './designer.service';

@Controller('api/designer')
export class DesignerApiController {
  constructor(private readonly designerService: DesignerService) {}

  @Get()
  async index(): Promise<
    Response$FetchDesigner$Status$200['application/json']
  > {
    return {
      designer: await this.designerService.find(),
    };
  }
}
