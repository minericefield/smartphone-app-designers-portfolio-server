import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SessionSerializer } from '../../commons/serializers/session.serializer';
import { SimpleHashingService } from '../../commons/services/simple-hashing.service';
import { AdminsModule } from '../admins/admins.module';

import { AuthRendererController } from './auth-admins-renderer.controller';
import { AuthAdminsService } from './auth-admins.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [AdminsModule, PassportModule],
  controllers: [AuthRendererController],
  providers: [
    AuthAdminsService,
    LocalStrategy,
    SessionSerializer,
    SimpleHashingService,
  ],
})
export class AuthAdminsModule {}
