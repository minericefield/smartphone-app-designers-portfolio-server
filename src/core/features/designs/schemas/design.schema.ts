import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { CategoriesValue } from '../../../commons/constants';

export type DesignDocument = Design & Document;

@Schema()
export class Design {
  _id: string;

  @Prop({ type: String })
  titleHeading: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  descriptionHeading: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  file: string;

  @Prop({ type: Number, ref: 'Category' })
  category: CategoriesValue;

  @Prop({ type: String })
  baseColor: string;

  @Prop({ type: Number })
  isPublic: number;
}

export const DesignSchema = SchemaFactory.createForClass(Design);
