import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { CategoriesKey, CategoriesValue } from '../../../commons/constants';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ type: Number, immutable: true })
  _id: CategoriesValue;

  @Prop({ required: true, immutable: true })
  name: CategoriesKey;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
