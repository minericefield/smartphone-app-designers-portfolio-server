import fs from 'fs';
import { join, basename } from 'path';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StaticDirUploaderService } from '../../../commons/services/uploader.service';
import {
  Designer,
  DesignerDocument,
} from '../../../features/designer/schemas/designer.schema';

import { getData } from './data';

@Injectable()
export class DesignerSeedService {
  constructor(
    @InjectModel(Designer.name)
    private readonly designerModel: Model<DesignerDocument>,
  ) {}

  run() {
    if (process.env.NODE_ENV !== 'production') {
      const data = getData();
      const date = new Date();
      const fileName = date.getTime() + basename(data.file);
      const filePath = join(StaticDirUploaderService.imagesDir, fileName);
      const filePathResolved = join(
        StaticDirUploaderService.imagesDirResolved,
        fileName,
      );
      fs.copyFileSync(data.file, filePathResolved);
      return new this.designerModel({ ...data, file: filePath }).save();
    }
  }
}
