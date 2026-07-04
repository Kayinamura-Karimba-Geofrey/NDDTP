import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id: string) {
    super({ statusCode: HttpStatus.NOT_FOUND, message: `${resource} '${id}' not found`, error: 'Not Found' }, HttpStatus.NOT_FOUND);
  }
}

export class IntegrityViolationException extends HttpException {
  constructor(id: string) {
    super({ statusCode: HttpStatus.CONFLICT, message: `Integrity check failed for audit log '${id}'`, error: 'Conflict' }, HttpStatus.CONFLICT);
  }
}
