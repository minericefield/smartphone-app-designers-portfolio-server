import { Injectable } from '@nestjs/common';

import { ADMIN_STATUS } from '../../commons/constants';
import { SimpleHashingService } from '../../commons/services/simple-hashing.service';
import { AdminsService } from '../admins/admins.service';

import { VerifyAuthAdminsDto, ResetPasswordAuthAdminsDto } from './dto';

@Injectable()
export class AuthAdminsService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly simpleHashingService: SimpleHashingService,
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminsService.findOneByEmail(email);
    if (
      admin?.status === ADMIN_STATUS.ACTIVATED &&
      (await this.simpleHashingService.compare(password, admin.password))
    ) {
      const { password, ...result } = { ...admin.toObject() }; // https://stackoverflow.com/questions/54951260/spread-syntax-returns-unexpected-object
      return result;
    }
    return null;
  }

  async verifyAdmin(verifyAuthAdminsDto: VerifyAuthAdminsDto) {
    const admin = await this.adminsService.findOneByEmail(
      verifyAuthAdminsDto.email,
    );
    const updated = await await this.adminsService.update(admin._id, {
      ...verifyAuthAdminsDto,
      status: ADMIN_STATUS.ACTIVATED,
      canVerify: false,
    });
    return updated;
  }

  async resetPassword(resetPasswordAuthAdminsDto: ResetPasswordAuthAdminsDto) {
    const admin = await this.adminsService.findOneByEmail(
      resetPasswordAuthAdminsDto.email,
    );
    const updated = await this.adminsService.update(admin._id, {
      canVerify: true,
    });
    await this.adminsService.sendVerifyEmail(
      String(admin._id),
      resetPasswordAuthAdminsDto.email,
    );
    return updated;
  }
}
