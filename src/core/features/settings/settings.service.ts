import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSettingsDto, UpdateSettingsDto } from './dto';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
  ) {}

  find() {
    return this.settingsModel.findOne({}).exec();
  }

  create(createSettingsDto: CreateSettingsDto) {
    return new this.settingsModel(createSettingsDto).save();
  }

  update(updateSettingsDto: UpdateSettingsDto) {
    return this.settingsModel.updateMany(undefined, {
      $set: {
        ...updateSettingsDto,
        isUnderMaintenance: updateSettingsDto.isUnderMaintenance
          ? Number(updateSettingsDto.isUnderMaintenance)
          : 0,
      },
    });
  }
}
