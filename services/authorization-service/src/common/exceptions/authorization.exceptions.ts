import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, identifier: string) {
    super(
      { statusCode: HttpStatus.NOT_FOUND, message: `${resource} '${identifier}' not found`, error: 'Not Found' },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class DuplicateResourceException extends HttpException {
  constructor(resource: string, field: string, value: string) {
    super(
      { statusCode: HttpStatus.CONFLICT, message: `${resource} with ${field} '${value}' already exists`, error: 'Conflict' },
      HttpStatus.CONFLICT,
    );
  }
}

export class SystemResourceException extends HttpException {
  constructor(resource: string, action: string) {
    super(
      { statusCode: HttpStatus.FORBIDDEN, message: `Cannot ${action} system ${resource}`, error: 'Forbidden' },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class AssignmentConflictException extends HttpException {
  constructor(message: string) {
    super(
      { statusCode: HttpStatus.CONFLICT, message, error: 'Conflict' },
      HttpStatus.CONFLICT,
    );
  }
}

export class InsufficientPermissionException extends HttpException {
  constructor(permission: string) {
    super(
      { statusCode: HttpStatus.FORBIDDEN, message: `Insufficient permission: ${permission}`, error: 'Forbidden' },
      HttpStatus.FORBIDDEN,
    );
  }
}
