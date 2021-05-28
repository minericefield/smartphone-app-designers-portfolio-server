import { Module } from '@nestjs/common';

import { TopModule } from './top/top.module';

@Module({
  imports: [TopModule],
})
export class FeaturesModule {}
