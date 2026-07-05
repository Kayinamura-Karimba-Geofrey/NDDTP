import { INSTANCE_STATUS_TRANSITIONS, TASK_STATUS_TRANSITIONS } from '../../src/common/constants';
import { InstanceStatus, TaskStatus } from '../../src/common/enums';

describe('Instance Status Transitions', () => {
  it('should allow DRAFT to RUNNING', () => {
    expect(INSTANCE_STATUS_TRANSITIONS.DRAFT).toContain(InstanceStatus.RUNNING);
  });

  it('should allow RUNNING to COMPLETED', () => {
    expect(INSTANCE_STATUS_TRANSITIONS.RUNNING).toContain(InstanceStatus.COMPLETED);
  });

  it('should allow RUNNING to REJECTED', () => {
    expect(INSTANCE_STATUS_TRANSITIONS.RUNNING).toContain(InstanceStatus.REJECTED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(INSTANCE_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});

describe('Task Status Transitions', () => {
  it('should allow PENDING to APPROVED', () => {
    expect(TASK_STATUS_TRANSITIONS.PENDING).toContain(TaskStatus.APPROVED);
  });

  it('should allow PENDING to REJECTED', () => {
    expect(TASK_STATUS_TRANSITIONS.PENDING).toContain(TaskStatus.REJECTED);
  });

  it('should allow PENDING to SKIPPED', () => {
    expect(TASK_STATUS_TRANSITIONS.PENDING).toContain(TaskStatus.SKIPPED);
  });
});
