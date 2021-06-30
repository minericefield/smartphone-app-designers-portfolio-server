import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { AdminsSeedModule } from './admins/admins-seed.module';
import { CategoriesSeedModule } from './categories/categories-seed.module';
import { DesignerSeedModule } from './designer/designer-seed.module';
import { DesignsSeedModule } from './designs/designs-seed.module';
import { RolesSeedModule } from './roles/roles-seed.module';
import { SeedService } from './seed.service';
import { SettingsSeedModule } from './settings/settings-seed.module';

@Module({
  imports: [
    CommandModule,
    RolesSeedModule,
    AdminsSeedModule,
    CategoriesSeedModule,
    DesignsSeedModule,
    SettingsSeedModule,
    DesignerSeedModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
