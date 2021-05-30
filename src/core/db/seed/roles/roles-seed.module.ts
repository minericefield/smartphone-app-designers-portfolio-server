import { Module } from '@nestjs/common';

import { RolesModule } from '../../../features/roles/roles.module';

import { RolesSeedService } from './roles-seed.service';

@Module({
  imports: [RolesModule],
  providers: [RolesSeedService],
  exports: [RolesSeedService],
})
export class RolesSeedModule {}
