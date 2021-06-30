import { Controller, Get, Param } from '@nestjs/common';
import {
  Response$FetchDesigns$Status$200,
  Parameter$FetchDesigns,
} from 'smartphone-app-designers-portfolio-api-docs/server';

import { DesignsService } from './designs.service';

@Controller('api/designs')
export class DesignsApiController {
  constructor(private readonly designsService: DesignsService) {}

  @Get(':category')
  async index(
    @Param() { category }: Parameter$FetchDesigns,
  ): Promise<Response$FetchDesigns$Status$200['application/json']> {
    return {
      designs: await this.designsService.findPublicByCategory(category),
    };
  }
}
