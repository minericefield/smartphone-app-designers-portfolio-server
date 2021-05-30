import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResetPasswordAuthAdminsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
