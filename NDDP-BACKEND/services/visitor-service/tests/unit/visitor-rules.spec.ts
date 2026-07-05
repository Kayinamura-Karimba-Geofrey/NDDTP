import { VISIT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { VisitStatus } from '../../src/common/enums';

describe('Visit Status Transitions', () => {
  it('should allow PENDING to APPROVED', () => {
    expect(VISIT_STATUS_TRANSITIONS.PENDING).toContain(VisitStatus.APPROVED);
  });

  it('should allow PENDING to REJECTED', () => {
    expect(VISIT_STATUS_TRANSITIONS.PENDING).toContain(VisitStatus.REJECTED);
  });

  it('should allow APPROVED to ACTIVE', () => {
    expect(VISIT_STATUS_TRANSITIONS.APPROVED).toContain(VisitStatus.ACTIVE);
  });

  it('should allow ACTIVE to COMPLETED', () => {
    expect(VISIT_STATUS_TRANSITIONS.ACTIVE).toContain(VisitStatus.COMPLETED);
  });

  it('should allow PENDING to CANCELLED', () => {
    expect(VISIT_STATUS_TRANSITIONS.PENDING).toContain(VisitStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(VISIT_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
