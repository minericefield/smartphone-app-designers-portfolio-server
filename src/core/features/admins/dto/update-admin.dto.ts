import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

import { RolesValue, ADMIN_STATUS } from '../../../commons/constants';

export class UpdateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain uppercase letters and symbols',
  })
  password: string;

  role: RolesValue;
  status: ADMIN_STATUS;
  canVerify: boolean;
}
