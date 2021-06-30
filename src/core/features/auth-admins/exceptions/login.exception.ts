import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginException extends HttpException {
  constructor() {
    super('Authorization failed', HttpStatus.UNAUTHORIZED);
  }
}
