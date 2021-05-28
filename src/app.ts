import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './core/app.module';

export async function getApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  return app;
}
