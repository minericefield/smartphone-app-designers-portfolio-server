import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploaderServiceProvider } from '../../commons/services/uploader.service';

import { DesignerApiController } from './designer-api.controller';
import { DesignerRendererController } from './designer-renderer.controller';
import { DesignerService } from './designer.service';
import { Designer, DesignerSchema } from './schemas/designer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Designer.name, schema: DesignerSchema },
    ]),
  ],
  controllers: [DesignerRendererController, DesignerApiController],
  providers: [DesignerService, UploaderServiceProvider],
  exports: [DesignerService],
})
export class DesignerModule {}
