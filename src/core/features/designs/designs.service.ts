import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  StaticDirUploaderService,
  AwsSdkUploaderService,
  UPLOADER_SERVICE_PROVIDER_KEY,
} from '../../commons/services/uploader.service';

import { CreateDesignFileDto, CreateDesignDto } from './dto/';
import { Design, DesignDocument } from './schemas/design.schema';

@Injectable()
export class DesignsService {
  constructor(
    @InjectModel(Design.name)
    private readonly designModel: Model<DesignDocument>,
    @Inject(UPLOADER_SERVICE_PROVIDER_KEY)
    private readonly uploaderService:
      | StaticDirUploaderService
      | AwsSdkUploaderService,
  ) {}

  findAll() {
    return this.designModel.find().populate('category').exec();
  }

  findOneById(id: string) {
    return this.designModel.findById(id).populate('category').exec();
  }

  async create(
    createDesignFileDto: CreateDesignFileDto,
    createDesignDto: CreateDesignDto,
  ) {
    const file = await this.uploaderService.upload(createDesignFileDto);
    const mergedDesignDto = { file, ...createDesignDto };
    return new this.designModel(mergedDesignDto).save();
  }

  async update() {
    return;
  }

  async remove(id: string) {
    const { file } = await this.findOneById(id);
    await this.uploaderService.remove(file);
    return this.designModel.deleteOne({ _id: id }).exec();
  }
}
