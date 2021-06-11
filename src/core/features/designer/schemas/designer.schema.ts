import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DesignerDocument = Designer & Document;

@Schema()
export class Designer {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  descriptionHeading: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  file: string;

  @Prop({ type: String })
  baseColor: string;
}

export const DesignerSchema = SchemaFactory.createForClass(Designer);
