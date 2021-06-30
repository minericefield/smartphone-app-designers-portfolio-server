import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

import { RolesValue, ADMIN_STATUS } from '../../../commons/constants';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain uppercase letters and symbols',
  })
  password: string;

  @IsNotEmpty()
  role: RolesValue;

  status: ADMIN_STATUS;

  canVerify: boolean;
}
