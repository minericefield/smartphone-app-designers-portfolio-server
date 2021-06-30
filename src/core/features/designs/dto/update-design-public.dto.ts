import { IsNumber } from 'class-validator';

export class UpdateDesignPublicDto {
  @IsNumber()
  isPublic: number;
}
