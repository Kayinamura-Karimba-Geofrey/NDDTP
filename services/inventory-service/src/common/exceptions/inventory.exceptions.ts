export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';

import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientStockException extends HttpException {
  constructor(itemId: string, available: number, requested: number) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Insufficient stock for item '${itemId}': available ${available}, requested ${requested}`,
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
