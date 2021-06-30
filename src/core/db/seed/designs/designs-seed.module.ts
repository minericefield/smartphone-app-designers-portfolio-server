import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Design,
  DesignSchema,
} from '../../../features/designs/schemas/design.schema';

import { DesignsSeedService } from './designs-seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }]),
  ],
  providers: [DesignsSeedService],
  exports: [DesignsSeedService],
})
export class DesignsSeedModule {}
