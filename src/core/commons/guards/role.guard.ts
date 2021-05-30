import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { RolesValue } from '../constants';
import { PermissionException } from '../exceptions/permission.exception';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRoles: RolesValue[]) {}

  async canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest<Request>();
    if (this.requiredRoles.includes(user.role._id)) {
      return true;
    } else {
      throw new PermissionException();
    }
  }
}
