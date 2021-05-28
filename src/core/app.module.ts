import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [DbModule, FeaturesModule],
})
export class AppModule {}
