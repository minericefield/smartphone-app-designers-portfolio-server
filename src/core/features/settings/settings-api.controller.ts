import { Controller, Get } from '@nestjs/common';
import { Response$FetchSettings$Status$200 } from 'smartphone-app-designers-portfolio-api-docs/server';

import { SettingsService } from './settings.service';

@Controller('api/settings')
export class SettingsApiController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async index(): Promise<
    Response$FetchSettings$Status$200['application/json']
  > {
    return {
      settings: await this.settingsService.find(),
    };
  }
}
