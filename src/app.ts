import { NestFactory } from '@nestjs/core';

import { AppModule } from './core/app.module';

export async function getApp() {
  const app = await NestFactory.create(AppModule);

  return app;
}
