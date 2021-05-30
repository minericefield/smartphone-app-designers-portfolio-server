import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailServiceProvider } from '../../commons/helpers/emailer.service';
import { SimpleHashingService } from '../../commons/helpers/simple-hashing.service';
import { RolesModule } from '../roles/roles.module';

import { AdminsRendererController } from './admins-renderer.controller';
import { AdminsService } from './admins.service';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    RolesModule,
  ],
  controllers: [AdminsRendererController],
  providers: [AdminsService, SimpleHashingService, EmailServiceProvider],
  exports: [AdminsService],
})
export class AdminsModule {}
