import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploaderServiceProvider } from '../../commons/services/uploader.service';
import { CategoriesModule } from '../categories/categories.module';

import { DesignsApiController } from './designs-api.controller';
import { DesignsRendererController } from './designs-renderer.controller';
import { DesignsService } from './designs.service';
import { Design, DesignSchema } from './schemas/design.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }]),
    CategoriesModule,
  ],
  controllers: [DesignsApiController, DesignsRendererController],
  providers: [DesignsService, UploaderServiceProvider],
})
export class DesignsModule {}
