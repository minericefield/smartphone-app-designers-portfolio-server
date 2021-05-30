import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RolesKey, RolesValue } from '../../../commons/constants';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ type: Number, immutable: true })
  _id: RolesValue;

  @Prop({ required: true, immutable: true })
  name: RolesKey;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
