import { Injectable } from '@nestjs/common';

import { SettingsService } from '../../../features/settings/settings.service';

import { getData } from './data';

@Injectable()
export class SettingsSeedService {
  constructor(private readonly settingsService: SettingsService) {}

  run() {
    return this.settingsService.create(getData());
  }
}
