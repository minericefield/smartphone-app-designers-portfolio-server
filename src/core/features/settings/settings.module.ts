import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Settings, SettingsSchema } from './schemas/settings.schema';
import { SettingsApiController } from './settings-api.controller';
import { SettingsRendererController } from './settings-renderer.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [SettingsRendererController, SettingsApiController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
