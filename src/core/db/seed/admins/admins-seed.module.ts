import { Module } from '@nestjs/common';

import { AdminsModule } from '../../../features/admins/admins.module';

import { AdminsSeedService } from './admins-seed.service';

@Module({
  imports: [AdminsModule],
  providers: [AdminsSeedService],
  exports: [AdminsSeedService],
})
export class AdminsSeedModule {}
