import { INestApplication } from '@nestjs/common';
import { pick } from 'ramda';

import { RolesService } from '../../src/core/features/roles/roles.service';
import { getInitializedAppForService, doneApp } from '../../test/helper';

describe('Roles Service', () => {
  let app: INestApplication;
  let rolesService: RolesService;

  beforeEach(async () => {
    app = await getInitializedAppForService();

    rolesService = app.get<RolesService>(RolesService);
    await rolesService.create({ _id: 1, name: 'FULL CONTROL' });
    await rolesService.create({ _id: 2, name: 'BROWSING CONTROL' });
  });

  it('roles', async () => {
    const roles = (await rolesService.findAll()).map(pick(['_id', 'name']));
    expect(roles).toStrictEqual([
      { _id: 1, name: 'FULL CONTROL' },
      { _id: 2, name: 'BROWSING CONTROL' },
    ]);
  });

  it('cannot create same one', async () => {
    expect(
      rolesService.create({ _id: 1, name: 'FULL CONTROL' }),
    ).rejects.toThrowError();
  });

  afterEach(async (done) => {
    await doneApp(app);
    done();
  });
});
