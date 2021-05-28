import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DbService } from './db.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DbService,
    }),
  ],
})
export class DbModule {}
