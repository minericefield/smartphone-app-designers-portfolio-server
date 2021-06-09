import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Settings, SettingsSchema } from './schemas/settings.schema';
import { SettingsRendererController } from './settings-renderer.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [SettingsRendererController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
