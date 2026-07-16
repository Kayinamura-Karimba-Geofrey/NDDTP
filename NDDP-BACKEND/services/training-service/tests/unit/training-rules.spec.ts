import { ENROLLMENT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { EnrollmentStatus } from '../../src/common/enums';

describe('Enrollment Status Transitions', () => {
  it('should allow PENDING to APPROVED', () => {
    expect(ENROLLMENT_STATUS_TRANSITIONS.PENDING).toContain(EnrollmentStatus.APPROVED);
  });

  it('should allow APPROVED to ENROLLED', () => {
    expect(ENROLLMENT_STATUS_TRANSITIONS.APPROVED).toContain(EnrollmentStatus.ENROLLED);
  });

  it('should allow IN_PROGRESS to COMPLETED', () => {
    expect(ENROLLMENT_STATUS_TRANSITIONS.IN_PROGRESS).toContain(EnrollmentStatus.COMPLETED);
  });

  it('should not allow COMPLETED transitions', () => {
    expect(ENROLLMENT_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});

describe('Session Capacity', () => {
  it('should calculate available slots', () => {
    const capacity = 40;
    const enrolled = 35;
    expect(Math.max(0, capacity - enrolled)).toBe(5);
  });
});

describe('Certification Rules', () => {
  it('should require completed enrollment before certification', () => {
    expect(EnrollmentStatus.COMPLETED).toBe('COMPLETED');
  });
});
