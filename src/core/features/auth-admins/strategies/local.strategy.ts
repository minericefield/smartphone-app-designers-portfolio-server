import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthAdminsService } from '../auth-admins.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authAdminsService: AuthAdminsService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.authAdminsService.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
