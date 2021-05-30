import { Injectable } from '@nestjs/common';

import { RolesService } from '../../../features/roles/roles.service';

import { getData } from './data';

@Injectable()
export class RolesSeedService {
  constructor(private readonly rolesService: RolesService) {}

  run() {
    return Promise.all(
      getData().map(async (item) => await this.rolesService.create(item)),
    );
  }
}
