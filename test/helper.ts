import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import { AppModule } from '../src/core/app.module';

export async function getInitializedAppForService() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return app;
}

export async function doneApp(app: INestApplication) {
  // TODO: filter by connection name
  const { db } = await app.get<Connection>(getConnectionToken());
  const collections = await db.listCollections().toArray();

  await Promise.all(
    collections.map(
      async (collection) => await db.dropCollection(collection.name),
    ),
  );
  await app.close();
}
