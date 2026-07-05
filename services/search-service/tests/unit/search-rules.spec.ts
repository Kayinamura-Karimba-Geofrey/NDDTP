import { QUERY_STATUS_TRANSITIONS } from '../../src/common/constants';
import { QueryStatus } from '../../src/common/enums';

describe('Query Status Transitions', () => {
  it('should allow PENDING to COMPLETED', () => {
    expect(QUERY_STATUS_TRANSITIONS.PENDING).toContain(QueryStatus.COMPLETED);
  });

  it('should allow PENDING to FAILED', () => {
    expect(QUERY_STATUS_TRANSITIONS.PENDING).toContain(QueryStatus.FAILED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(QUERY_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });

  it('should not allow transitions from FAILED', () => {
    expect(QUERY_STATUS_TRANSITIONS.FAILED).toHaveLength(0);
  });
});
