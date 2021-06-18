import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ADMIN_STATUS, RolesValue } from '../../../commons/constants';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  _id: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ required: true, type: Number, ref: 'Role' })
  role: RolesValue;

  @Prop({ required: true, type: String })
  status: ADMIN_STATUS;

  @Prop({ required: true, type: Boolean })
  canVerify: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

// TODO: define populate definitions
// export type AdminDocumentPopulatedWidthRole = AdminDocument & {
//   role: RoleDocument;
// };
