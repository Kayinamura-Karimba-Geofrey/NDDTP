import { API_KEY_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ApiKeyStatus } from '../../src/common/enums';

describe('API Key Status Transitions', () => {
  it('should allow ACTIVE to REVOKED', () => {
    expect(API_KEY_STATUS_TRANSITIONS.ACTIVE).toContain(ApiKeyStatus.REVOKED);
  });

  it('should not allow transitions from REVOKED', () => {
    expect(API_KEY_STATUS_TRANSITIONS.REVOKED).toHaveLength(0);
  });
});
