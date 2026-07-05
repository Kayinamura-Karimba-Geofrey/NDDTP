export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';

import { HttpException, HttpStatus } from '@nestjs/common';

export class TemplateRenderException extends HttpException {
  constructor(message: string) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
  }
}
