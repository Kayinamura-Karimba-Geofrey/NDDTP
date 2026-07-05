import { QUERY_STATUS_TRANSITIONS } from '../../src/common/constants';
import { QueryStatus } from '../../src/common/enums';

describe('Query Status Transitions', () => {
  it('should allow PENDING to PROCESSING', () => {
    expect(QUERY_STATUS_TRANSITIONS.PENDING).toContain(QueryStatus.PROCESSING);
  });

  it('should allow PROCESSING to COMPLETED', () => {
    expect(QUERY_STATUS_TRANSITIONS.PROCESSING).toContain(QueryStatus.COMPLETED);
  });

  it('should allow PROCESSING to FAILED', () => {
    expect(QUERY_STATUS_TRANSITIONS.PROCESSING).toContain(QueryStatus.FAILED);
  });

  it('should allow PENDING to CANCELLED', () => {
    expect(QUERY_STATUS_TRANSITIONS.PENDING).toContain(QueryStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(QUERY_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
