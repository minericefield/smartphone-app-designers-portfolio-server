import { Injectable } from '@nestjs/common';

import { AdminsService } from '../../../features/admins/admins.service';

import { getData } from './data';

@Injectable()
export class AdminsSeedService {
  constructor(private readonly adminsService: AdminsService) {}

  run() {
    return Promise.all(
      getData().map(async (item) => await this.adminsService.create(item)),
    );
  }
}
