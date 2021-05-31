import { INestApplication } from '@nestjs/common';

import { ROLES, ADMIN_STATUS } from '../../src/core/commons/constants';
import { SimpleHashingService } from '../../src/core/commons/services/simple-hashing.service';
import { AdminsService } from '../../src/core/features/admins/admins.service';
import { getInitializedAppForService, doneApp } from '../../test/helper';

describe('Admins Service', () => {
  let app: INestApplication;
  let adminsService: AdminsService;

  beforeEach(async () => {
    app = await getInitializedAppForService();

    adminsService = app.get<AdminsService>(AdminsService);
  });

  it('password would not be saved directly', async () => {
    await adminsService.create({
      email: 'admin@example.com',
      password: 'Password1234_',
      role: ROLES['FULL CONTROL'],
      status: ADMIN_STATUS.ACTIVATED,
      canVerify: false,
    });
    const admin = await adminsService.findOneByEmail('admin@example.com');
    expect(admin.password).not.toBe('Password1234_');
  });

  it('password would be saved by comparable hash', async () => {
    await adminsService.create({
      email: 'admin@example.com',
      password: 'Password1234_',
      role: ROLES['FULL CONTROL'],
      status: ADMIN_STATUS.ACTIVATED,
      canVerify: false,
    });
    const simpleHashingService =
      app.get<SimpleHashingService>(SimpleHashingService);
    const admin = await adminsService.findOneByEmail('admin@example.com');
    expect(
      await simpleHashingService.compare('Password1234_', admin.password),
    ).toBeTruthy();
  });

  afterEach(async (done) => {
    await doneApp(app);
    done();
  });
});
