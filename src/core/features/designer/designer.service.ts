import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isEmpty } from 'ramda';

import {
  StaticDirUploaderService,
  AwsSdkUploaderService,
  UPLOADER_SERVICE_PROVIDER_KEY,
} from '../../commons/services/uploader.service';

import { UpdateDesignerFileDto, UpdateDesignerDto } from './dto/';
import { Designer, DesignerDocument } from './schemas/designer.schema';

@Injectable()
export class DesignerService {
  constructor(
    @InjectModel(Designer.name)
    private readonly designerModel: Model<DesignerDocument>,
    @Inject(UPLOADER_SERVICE_PROVIDER_KEY)
    private readonly uploaderService:
      | StaticDirUploaderService
      | AwsSdkUploaderService,
  ) {}

  find() {
    return this.designerModel.findOne({}).exec();
  }

  async update(
    updateDesignerFileDto: UpdateDesignerFileDto,
    updateDesignerDto: UpdateDesignerDto,
  ) {
    if (isEmpty(updateDesignerFileDto)) {
      return this.designerModel.updateMany(undefined, {
        $set: updateDesignerDto,
      });
    } else {
      const { file: oldFile } = await this.find();
      await this.uploaderService.remove(oldFile);
      const file = await this.uploaderService.upload(updateDesignerFileDto);
      const mergedDesignerDto = { file, ...updateDesignerFileDto };
      return this.designerModel.updateMany(undefined, {
        $set: mergedDesignerDto,
      });
    }
  }
}
