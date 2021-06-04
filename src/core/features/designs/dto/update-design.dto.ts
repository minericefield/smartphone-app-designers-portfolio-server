import { IsString, IsNotEmpty } from 'class-validator';

import { CategoriesValue } from '../../../commons/constants';

export class UpdateDesignDto {
  @IsString()
  titleHeading: string;

  @IsString()
  title: string;

  @IsString()
  descriptionHeading: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  category: CategoriesValue;

  @IsString()
  baseColor: string;
}
