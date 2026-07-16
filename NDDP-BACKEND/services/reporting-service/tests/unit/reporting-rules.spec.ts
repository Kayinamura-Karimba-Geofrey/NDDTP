import { REQUEST_STATUS_TRANSITIONS } from '../../src/common/constants';
import { RequestStatus } from '../../src/common/enums';

describe('Request Status Transitions', () => {
  it('should allow PENDING to PROCESSING', () => {
    expect(REQUEST_STATUS_TRANSITIONS.PENDING).toContain(RequestStatus.PROCESSING);
  });

  it('should allow PROCESSING to COMPLETED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.PROCESSING).toContain(RequestStatus.COMPLETED);
  });

  it('should allow PROCESSING to FAILED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.PROCESSING).toContain(RequestStatus.FAILED);
  });

  it('should allow PENDING to CANCELLED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.PENDING).toContain(RequestStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
