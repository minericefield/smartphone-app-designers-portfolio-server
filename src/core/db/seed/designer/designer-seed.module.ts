import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Designer,
  DesignerSchema,
} from '../../../features/designer/schemas/designer.schema';

import { DesignerSeedService } from './designer-seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Designer.name, schema: DesignerSchema },
    ]),
  ],
  providers: [DesignerSeedService],
  exports: [DesignerSeedService],
})
export class DesignerSeedModule {}
