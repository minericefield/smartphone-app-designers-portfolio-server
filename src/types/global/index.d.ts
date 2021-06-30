import 'express';
import { ObjectId } from 'mongoose';

import {
  RolesValue,
  RolesKey,
  ADMIN_STATUS,
} from '../../core/commons/constants';

declare module 'express' {
  export interface Request {
    user: {
      _id: ObjectId;
      email: string;
      role: {
        _id: RolesValue;
        name: RolesKey;
      };
      status: ADMIN_STATUS;
    };
  }
}
