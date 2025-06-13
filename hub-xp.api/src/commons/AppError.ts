import { HttpException, HttpStatus } from '@nestjs/common';
import { OperationErrors } from './OperationErrors.enum';

export class AppError extends HttpException {
  public readonly name: OperationErrors;
  public readonly isOperational: boolean;

  constructor(
    name: OperationErrors,
    httpCode: HttpStatus,
    description: string,
    isOperational: boolean,
  ) {
    super(
      {
        message: description,
      },
      httpCode,
    );

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
