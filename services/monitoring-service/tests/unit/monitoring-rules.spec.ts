import { CHECK_STATUS_TRANSITIONS, ALERT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { CheckStatus, AlertStatus } from '../../src/common/enums';

describe('Check Status Transitions', () => {
  it('should allow PENDING to RUNNING', () => {
    expect(CHECK_STATUS_TRANSITIONS.PENDING).toContain(CheckStatus.RUNNING);
  });

  it('should allow RUNNING to PASSED', () => {
    expect(CHECK_STATUS_TRANSITIONS.RUNNING).toContain(CheckStatus.PASSED);
  });

  it('should allow RUNNING to FAILED', () => {
    expect(CHECK_STATUS_TRANSITIONS.RUNNING).toContain(CheckStatus.FAILED);
  });

  it('should not allow transitions from PASSED', () => {
    expect(CHECK_STATUS_TRANSITIONS.PASSED).toHaveLength(0);
  });
});

describe('Alert Status Transitions', () => {
  it('should allow OPEN to ACKNOWLEDGED', () => {
    expect(ALERT_STATUS_TRANSITIONS.OPEN).toContain(AlertStatus.ACKNOWLEDGED);
  });

  it('should allow ACKNOWLEDGED to RESOLVED', () => {
    expect(ALERT_STATUS_TRANSITIONS.ACKNOWLEDGED).toContain(AlertStatus.RESOLVED);
  });

  it('should not allow transitions from RESOLVED', () => {
    expect(ALERT_STATUS_TRANSITIONS.RESOLVED).toHaveLength(0);
  });
});
