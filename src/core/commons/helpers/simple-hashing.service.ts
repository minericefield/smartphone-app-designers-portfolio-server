import { Injectable } from '@nestjs/common';
import { hash, compare as _compare } from 'bcryptjs';

@Injectable()
export class SimpleHashingService {
  toHash(str: string) {
    return hash(str, process.env.SIMPLE_HASHING_SALT);
  }

  compare = _compare;

  async objWithPasswordToHashed<T extends { password: string }>(object: T) {
    return {
      ...object,
      password: await this.toHash(object.password),
    };
  }
}
