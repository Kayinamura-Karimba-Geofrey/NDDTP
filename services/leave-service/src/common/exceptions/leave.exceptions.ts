import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id: string) {
    super({ statusCode: HttpStatus.NOT_FOUND, message: `${resource} '${id}' not found`, error: 'Not Found' }, HttpStatus.NOT_FOUND);
  }
}

export class InvalidStatusTransitionException extends HttpException {
  constructor(from: string, to: string) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message: `Cannot transition leave request from ${from} to ${to}`, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
  }
}

export class InsufficientBalanceException extends HttpException {
  constructor(available: number, requested: number) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message: `Insufficient leave balance: available ${available}, requested ${requested}`, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
  }
}

export class BusinessRuleViolationException extends HttpException {
  constructor(message: string) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
  }
}
