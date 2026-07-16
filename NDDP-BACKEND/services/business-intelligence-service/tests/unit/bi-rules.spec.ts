import { EXECUTION_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ExecutionStatus } from '../../src/common/enums';

describe('Execution Status Transitions', () => {
  it('should allow PENDING to PROCESSING', () => {
    expect(EXECUTION_STATUS_TRANSITIONS.PENDING).toContain(ExecutionStatus.PROCESSING);
  });

  it('should allow PROCESSING to COMPLETED', () => {
    expect(EXECUTION_STATUS_TRANSITIONS.PROCESSING).toContain(ExecutionStatus.COMPLETED);
  });

  it('should allow PROCESSING to FAILED', () => {
    expect(EXECUTION_STATUS_TRANSITIONS.PROCESSING).toContain(ExecutionStatus.FAILED);
  });

  it('should allow PENDING to CANCELLED', () => {
    expect(EXECUTION_STATUS_TRANSITIONS.PENDING).toContain(ExecutionStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(EXECUTION_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
