import { JOB_STATUS_TRANSITIONS, RESTORE_STATUS_TRANSITIONS } from '../../src/common/constants';
import { JobStatus, RestoreStatus } from '../../src/common/enums';

describe('Backup Job Status Transitions', () => {
  it('should allow PENDING to RUNNING', () => {
    expect(JOB_STATUS_TRANSITIONS.PENDING).toContain(JobStatus.RUNNING);
  });

  it('should allow RUNNING to COMPLETED', () => {
    expect(JOB_STATUS_TRANSITIONS.RUNNING).toContain(JobStatus.COMPLETED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(JOB_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});

describe('Restore Status Transitions', () => {
  it('should allow PENDING to RUNNING', () => {
    expect(RESTORE_STATUS_TRANSITIONS.PENDING).toContain(RestoreStatus.RUNNING);
  });

  it('should allow RUNNING to COMPLETED', () => {
    expect(RESTORE_STATUS_TRANSITIONS.RUNNING).toContain(RestoreStatus.COMPLETED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(RESTORE_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
