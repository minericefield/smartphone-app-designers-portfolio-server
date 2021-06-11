import { Module } from '@nestjs/common';

import { AdminsModule } from './admins/admins.module';
import { AuthAdminsModule } from './auth-admins/auth-admins.module';
import { DesignerModule } from './designer/designer.module';
import { DesignsModule } from './designs/designs.module';
import { RolesModule } from './roles/roles.module';
import { SettingsModule } from './settings/settings.module';
import { TopModule } from './top/top.module';

@Module({
  imports: [
    TopModule,
    AdminsModule,
    AuthAdminsModule,
    RolesModule,
    DesignsModule,
    SettingsModule,
    DesignerModule,
  ],
})
export class FeaturesModule {}
