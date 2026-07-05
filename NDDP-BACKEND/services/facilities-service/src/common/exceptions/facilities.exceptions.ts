export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';

import { HttpException, HttpStatus } from '@nestjs/common';

export class BookingConflictException extends HttpException {
  constructor(message: string) {
    super({ statusCode: HttpStatus.CONFLICT, message, error: 'Conflict' }, HttpStatus.CONFLICT);
  }
}
