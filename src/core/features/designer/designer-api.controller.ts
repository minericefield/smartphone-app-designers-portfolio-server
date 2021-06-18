import { Controller, Get } from '@nestjs/common';

// import { Designer } from './api-types';
import { DesignerService } from './designer.service';

@Controller('api/designer')
export class DesignerApiController {
  constructor(private readonly designerService: DesignerService) {}

  @Get()
  async index() {
    return {
      designer: await this.designerService.find(),
    };
  }
}
