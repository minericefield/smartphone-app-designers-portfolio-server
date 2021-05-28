import { Module } from '@nestjs/common';

import { TopRendererController } from './top-renderer.controller';

@Module({
  controllers: [TopRendererController],
})
export class TopModule {}
