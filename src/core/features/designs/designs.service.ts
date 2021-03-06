import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isEmpty } from 'ramda';

import { CategoriesValue } from '../../commons/constants';
import { ImageResizeService } from '../../commons/services/image-resize.service';
import {
  StaticDirUploaderService,
  AwsSdkUploaderService,
  UPLOADER_SERVICE_PROVIDER_KEY,
} from '../../commons/services/uploader.service';

import {
  CreateDesignFileDto,
  CreateDesignDto,
  UpdateDesignFileDto,
  UpdateDesignDto,
} from './dto/';
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
    private readonly imageResizeService: ImageResizeService,
  ) {}

  findAll() {
    return this.designModel.find().populate('category').exec();
  }

  findOneById(id: string) {
    return this.designModel.findById(id).populate('category').exec();
  }

  findPublicByCategory(category: CategoriesValue) {
    return this.designModel.find({ category, isPublic: 1 }).exec();
  }

  async create(
    createDesignFileDto: CreateDesignFileDto,
    createDesignDto: CreateDesignDto,
  ) {
    const file = await this.uploaderService.upload({
      ...createDesignFileDto,
      buffer: await this.imageResizeService.resize(createDesignFileDto.buffer),
    });
    const mergedDesignDto = {
      file,
      ...createDesignDto,
      isPublic: createDesignDto.isPublic ? Number(createDesignDto.isPublic) : 0,
    };
    return new this.designModel(mergedDesignDto).save();
  }

  async update(
    id: string,
    updateDesignFileDto: UpdateDesignFileDto,
    updateDesignDto: UpdateDesignDto,
  ) {
    if (isEmpty(updateDesignFileDto)) {
      return this.designModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...updateDesignDto,
            isPublic: updateDesignDto.isPublic
              ? Number(updateDesignDto.isPublic)
              : 0,
          },
        },
      );
    } else {
      const { file: oldFile } = await this.findOneById(id);
      await this.uploaderService.remove(oldFile);
      const file = await this.uploaderService.upload({
        ...updateDesignFileDto,
        buffer: await this.imageResizeService.resize(
          updateDesignFileDto.buffer,
        ),
      });
      const mergedDesignDto = {
        file,
        ...updateDesignDto,
        isPublic: updateDesignDto.isPublic
          ? Number(updateDesignDto.isPublic)
          : 0,
      };
      return this.designModel.findOneAndUpdate(
        { _id: id },
        {
          $set: mergedDesignDto,
        },
      );
    }
  }

  async remove(id: string) {
    const { file } = await this.findOneById(id);
    await this.uploaderService.remove(file);
    return this.designModel.deleteOne({ _id: id }).exec();
  }

  updatePublic(id: string, isPublic: number) {
    return this.designModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isPublic: isPublic ? Number(isPublic) : 0,
        },
      },
    );
  }
}
