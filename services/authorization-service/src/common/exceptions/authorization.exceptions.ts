export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';

import { HttpException, HttpStatus } from '@nestjs/common';

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
    super({ statusCode: HttpStatus.CONFLICT, message, error: 'Conflict' }, HttpStatus.CONFLICT);
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
