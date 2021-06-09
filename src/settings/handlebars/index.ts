import { Document } from 'mongoose';
import { path, init, equals, toString, pipe } from 'ramda';

import { ROLES, ADMIN_STATUS } from '../../core/commons/constants';
import { AdminDocument } from '../../core/features/admins/schemas/admin.schema';

export const handlebarHelpers = {
  docToObject: function (doc: Document) {
    return doc.toObject();
  },
  getValueFromDoc: function (doc: Document, ...keys: string[]) {
    keys = init(keys);
    return path(keys, doc);
  },
  // TODO: typing role referenced admin
  isFullControl: function (admin: any) {
    return admin.role._id === ROLES['FULL CONTROL'];
  },
  isBrowsingControl: function (admin: any) {
    return admin.role._id === ROLES['BROWSING CONTROL'];
  },
  isPending: function (admin: AdminDocument) {
    return admin.status === ADMIN_STATUS.PENDING;
  },
  defaultTo: function (value1: any, value2?: any) {
    // return value2 || value1;
    return value2 !== undefined ? value2 : value1;
  },
  stringifyEquals: function (value1: any, value2: any) {
    if (typeof value1 !== 'string') {
      value1 = toString(value1);
    }
    if (typeof value2 !== 'string') {
      value2 = toString(value2);
    }

    return equals(value1, value2);
  },
};
