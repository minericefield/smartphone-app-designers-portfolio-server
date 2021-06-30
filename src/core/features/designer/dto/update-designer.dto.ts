import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateDesignerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  descriptionHeading: string;

  @IsString()
  description: string;

  @IsString()
  baseColor: string;
}
