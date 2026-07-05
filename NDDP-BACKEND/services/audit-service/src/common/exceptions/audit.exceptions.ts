export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';

import { HttpException, HttpStatus } from '@nestjs/common';

export class IntegrityViolationException extends HttpException {
  constructor(id: string) {
    super(
      { statusCode: HttpStatus.CONFLICT, message: `Integrity check failed for audit log '${id}'`, error: 'Conflict' },
      HttpStatus.CONFLICT,
    );
  }
}
