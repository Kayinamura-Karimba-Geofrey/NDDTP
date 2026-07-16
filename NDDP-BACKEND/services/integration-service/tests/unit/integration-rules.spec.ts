import { JOB_STATUS_TRANSITIONS } from '../../src/common/constants';
import { JobStatus } from '../../src/common/enums';

describe('Job Status Transitions', () => {
  it('should allow PENDING to RUNNING', () => {
    expect(JOB_STATUS_TRANSITIONS.PENDING).toContain(JobStatus.RUNNING);
  });

  it('should allow RUNNING to COMPLETED', () => {
    expect(JOB_STATUS_TRANSITIONS.RUNNING).toContain(JobStatus.COMPLETED);
  });

  it('should allow RUNNING to FAILED', () => {
    expect(JOB_STATUS_TRANSITIONS.RUNNING).toContain(JobStatus.FAILED);
  });

  it('should allow PENDING to CANCELLED', () => {
    expect(JOB_STATUS_TRANSITIONS.PENDING).toContain(JobStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(JOB_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
