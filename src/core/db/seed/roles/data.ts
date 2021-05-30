import { ROLES, RolesKey } from '../../../commons/constants';
import { Role } from '../../../features/roles/schemas/role.schema';

export function getData() {
  const data: Role[] = [];

  (Object.keys(ROLES) as RolesKey[]).forEach((name) => {
    data.push({
      _id: ROLES[name],
      name,
    });
  });

  return data;
}
