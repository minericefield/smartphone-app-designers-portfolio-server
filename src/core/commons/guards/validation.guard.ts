import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationGuard implements CanActivate, PipeTransform {
  constructor(private readonly metatype: ArgumentMetadata['metatype']) {}

  async canActivate(context: ExecutionContext) {
    const value = context.switchToHttp().getRequest().body;
    const result = await this.transform(value);

    return !!result;
  }

  async transform(value: any) {
    if (!this.metatype || !this.toValidate(this.metatype)) {
      return value;
    }
    const object = plainToClass(this.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    return value;
  }

  private toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
