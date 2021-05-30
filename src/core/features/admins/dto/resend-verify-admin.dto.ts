import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResendVerifyAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
