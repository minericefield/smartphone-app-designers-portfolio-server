import { ROLES, ADMIN_STATUS } from '../../../commons/constants';
import { Admin } from '../../../features/admins/schemas/admin.schema';

export function getData() {
  const data: Omit<Admin, '_id'>[] = [
    {
      email: process.env.FIRST_ADMIN_EMAIL || 'admin@example.com',
      password: process.env.FIRST_ADMIN_PASSWORD || 'Password1234_',
      role: ROLES['FULL CONTROL'],
      status: ADMIN_STATUS.ACTIVATED,
      canVerify: false,
    },
  ];

  if (process.env.NODE_ENV !== 'production') {
    data.push({
      email: 'viewer@example.com',
      password: 'Password1234_',
      role: ROLES['BROWSING CONTROL'],
      status: ADMIN_STATUS.ACTIVATED,
      canVerify: false,
    });
  }

  return data;
}
