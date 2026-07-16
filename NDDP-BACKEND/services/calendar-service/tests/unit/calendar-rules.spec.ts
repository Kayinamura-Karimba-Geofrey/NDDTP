import { EVENT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { EventStatus } from '../../src/common/enums';

describe('Event Status Transitions', () => {
  it('should allow DRAFT to SCHEDULED', () => {
    expect(EVENT_STATUS_TRANSITIONS.DRAFT).toContain(EventStatus.SCHEDULED);
  });

  it('should allow SCHEDULED to COMPLETED', () => {
    expect(EVENT_STATUS_TRANSITIONS.SCHEDULED).toContain(EventStatus.COMPLETED);
  });

  it('should allow SCHEDULED to CANCELLED', () => {
    expect(EVENT_STATUS_TRANSITIONS.SCHEDULED).toContain(EventStatus.CANCELLED);
  });

  it('should allow DRAFT to CANCELLED', () => {
    expect(EVENT_STATUS_TRANSITIONS.DRAFT).toContain(EventStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(EVENT_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
