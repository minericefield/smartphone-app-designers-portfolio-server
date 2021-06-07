import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { AdminsSeedModule } from './admins/admins-seed.module';
import { CategoriesSeedModule } from './categories/categories-seed.module';
import { DesignsSeedModule } from './designs/designs-seed.module';
import { RolesSeedModule } from './roles/roles-seed.module';
import { SeedService } from './seed.service';

@Module({
  imports: [
    CommandModule,
    RolesSeedModule,
    AdminsSeedModule,
    CategoriesSeedModule,
    DesignsSeedModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
