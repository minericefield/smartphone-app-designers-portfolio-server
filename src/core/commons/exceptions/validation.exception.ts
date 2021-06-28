import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export type ValidationExceptionResponse = {
  statusCode: HttpStatus;
  errorMessage: string;
  validationErrors: ValidationError[];
};

export class ValidationException extends HttpException {
  constructor(validationErrors: ValidationError[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        errorMessage: 'Validation failed',
        validationErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  getResponse() {
    return super.getResponse() as ValidationExceptionResponse; // No generic or type inference available
  }

  getResponseErrorFormatted() {
    const response = this.getResponse();
    const validationErrors: { [key: string]: string[] } = {};
    response.validationErrors.forEach((error) => {
      validationErrors[error.property] = Object.values(error.constraints);
    });

    return {
      ...response,
      validationErrors,
    };
  }
}
