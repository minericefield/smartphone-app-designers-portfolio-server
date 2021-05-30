import { IsNotEmpty, IsEmail } from 'class-validator';

import { RolesValue } from '../../../commons/constants';

export class CreateTemporaryAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: RolesValue;
}
