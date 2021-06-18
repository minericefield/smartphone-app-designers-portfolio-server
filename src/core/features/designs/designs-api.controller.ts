import { Controller, Get, Param } from '@nestjs/common';

import { CategoriesValue } from '../../commons/constants';

// import { Designs } from './api-types';
import { DesignsService } from './designs.service';

@Controller('api/designs')
export class DesignsApiController {
  constructor(private readonly designsService: DesignsService) {}

  @Get(':category')
  async index(@Param('category') category: CategoriesValue) {
    return {
      designs: await this.designsService.findPublicByCategory(category),
    };
  }
}
