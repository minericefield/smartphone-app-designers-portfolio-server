import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  _id: string;

  @Prop({ type: Number })
  isUnderMaintenance: number;

  @Prop({ type: String })
  maintenanceMessage: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
