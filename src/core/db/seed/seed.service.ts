import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

import { AdminsSeedService } from './admins/admins-seed.service';
import { CategoriesSeedService } from './categories/categories-seed.service';
import { DesignsSeedService } from './designs/designs-seed.service';
import { RolesSeedService } from './roles/roles-seed.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly adminsSeedService: AdminsSeedService,
    private readonly rolesSeedService: RolesSeedService,
    private readonly categoriesSeedService: CategoriesSeedService,
    private readonly designsSeedService: DesignsSeedService,
  ) {}

  @Command({ command: 'seed', describe: 'run seed', autoExit: true })
  async run() {
    await this.rolesSeedService.run();
    await this.adminsSeedService.run();
    await this.categoriesSeedService.run();
    await this.designsSeedService.run();
  }
}
