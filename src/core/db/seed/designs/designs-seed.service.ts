import fs from 'fs';
import { join, basename } from 'path';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StaticDirUploaderService } from '../../../commons/services/uploader.service';
import {
  Design,
  DesignDocument,
} from '../../../features/designs/schemas/design.schema';

import { getData } from './data';

@Injectable()
export class DesignsSeedService {
  constructor(
    @InjectModel(Design.name)
    private readonly designModel: Model<DesignDocument>,
  ) {}

  run() {
    if (process.env.NODE_ENV !== 'production') {
      return Promise.all(
        getData().map((item) => {
          const date = new Date();
          const fileName = date.getTime() + basename(item.file);
          const filePath = join(StaticDirUploaderService.imagesDir, fileName);
          const filePathResolved = join(
            StaticDirUploaderService.imagesDirResolved,
            fileName,
          );
          fs.copyFileSync(item.file, filePathResolved);
          return new this.designModel({ ...item, file: filePath }).save();
        }),
      );
    }
  }
}
