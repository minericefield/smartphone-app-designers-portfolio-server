import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { FeaturesModule } from './features/features.module';
import { GlobalsModule } from './globals/globals.module';

@Module({
  imports: [DbModule, FeaturesModule, GlobalsModule],
})
export class AppModule {}
