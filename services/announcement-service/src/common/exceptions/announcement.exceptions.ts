import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id: string) {
    super({ statusCode: HttpStatus.NOT_FOUND, message: `${resource} '${id}' not found`, error: 'Not Found' }, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateResourceException extends HttpException {
  constructor(field: string, value: string) {
    super({ statusCode: HttpStatus.CONFLICT, message: `${field} '${value}' already exists`, error: 'Conflict' }, HttpStatus.CONFLICT);
  }
}

export class InvalidStatusTransitionException extends HttpException {
  constructor(from: string, to: string) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message: `Cannot transition announcement from ${from} to ${to}`, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
  }
}

export class BusinessRuleViolationException extends HttpException {
  constructor(message: string) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
  }
}
