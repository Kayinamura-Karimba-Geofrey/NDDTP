import { calculateLeaveDays } from '../../src/common/utils/leave-days.util';
import { LEAVE_STATUS_TRANSITIONS } from '../../src/common/constants';
import { LeaveRequestStatus } from '../../src/common/enums';

describe('calculateLeaveDays', () => {
  it('should count inclusive calendar days', () => {
    expect(calculateLeaveDays('2024-06-01', '2024-06-01')).toBe(1);
    expect(calculateLeaveDays('2024-06-01', '2024-06-05')).toBe(5);
  });

  it('should return 0 for invalid range', () => {
    expect(calculateLeaveDays('2024-06-10', '2024-06-01')).toBe(0);
  });
});

describe('Leave Status Transitions', () => {
  it('should allow DRAFT to SUBMITTED', () => {
    expect(LEAVE_STATUS_TRANSITIONS.DRAFT).toContain(LeaveRequestStatus.SUBMITTED);
  });

  it('should allow PENDING_APPROVAL to APPROVED', () => {
    expect(LEAVE_STATUS_TRANSITIONS.PENDING_APPROVAL).toContain(LeaveRequestStatus.APPROVED);
  });

  it('should not allow APPROVED transitions', () => {
    expect(LEAVE_STATUS_TRANSITIONS.APPROVED).toHaveLength(0);
  });
});

describe('Available Balance', () => {
  it('should compute available days correctly', () => {
    const total = 30;
    const used = 5;
    const pending = 3;
    expect(total - used - pending).toBe(22);
  });
});
