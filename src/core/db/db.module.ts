import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DbService } from './db.service';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DbService,
    }),
    SeedModule,
  ],
})
export class DbModule {}
