export {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidStatusTransitionException,
  BusinessRuleViolationException,
  ForbiddenAccessException,
} from '@nddtp/platform-core';

import { ForbiddenAccessException } from '@nddtp/platform-core';

export class VisitorBlacklistedException extends ForbiddenAccessException {
  constructor(message?: string) {
    super(message || 'Access denied');
  }
}
