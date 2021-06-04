import { Module } from '@nestjs/common';

import { AdminsModule } from './admins/admins.module';
import { AuthAdminsModule } from './auth-admins/auth-admins.module';
import { DesignsModule } from './designs/designs.module';
import { RolesModule } from './roles/roles.module';
import { TopModule } from './top/top.module';

@Module({
  imports: [
    TopModule,
    AdminsModule,
    AuthAdminsModule,
    RolesModule,
    DesignsModule,
  ],
})
export class FeaturesModule {}
