import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploaderServiceProvider } from '../../commons/services/uploader.service';

import { DesignerRendererController } from './designer-renderer.controller';
import { DesignerService } from './designer.service';
import { Designer, DesignerSchema } from './schemas/designer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Designer.name, schema: DesignerSchema },
    ]),
  ],
  controllers: [DesignerRendererController],
  providers: [DesignerService, UploaderServiceProvider],
  exports: [DesignerService],
})
export class DesignerModule {}
