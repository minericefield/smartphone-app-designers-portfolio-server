import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { PermissionException } from '../../../commons/exceptions/permission.exception';
import { AdminsService } from '../../admins/admins.service';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private readonly adminsService: AdminsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const admin = await this.adminsService.findOneById(request.params.id);

    if (admin?.canVerify) {
      return true;
    } else {
      throw new PermissionException();
    }
  }
}
