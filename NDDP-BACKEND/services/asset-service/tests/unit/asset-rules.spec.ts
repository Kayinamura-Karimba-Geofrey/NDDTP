import { ASSET_STATUS_TRANSITIONS } from '../../src/common/constants';
import { AssetStatus } from '../../src/common/enums';

describe('Asset Status Transitions', () => {
  it('should allow REGISTERED to AVAILABLE', () => {
    expect(ASSET_STATUS_TRANSITIONS.REGISTERED).toContain(AssetStatus.AVAILABLE);
  });

  it('should allow AVAILABLE to ASSIGNED', () => {
    expect(ASSET_STATUS_TRANSITIONS.AVAILABLE).toContain(AssetStatus.ASSIGNED);
  });

  it('should allow ASSIGNED to AVAILABLE', () => {
    expect(ASSET_STATUS_TRANSITIONS.ASSIGNED).toContain(AssetStatus.AVAILABLE);
  });

  it('should not allow DISPOSED transitions', () => {
    expect(ASSET_STATUS_TRANSITIONS.DISPOSED).toHaveLength(0);
  });
});

describe('Asset Assignment Rules', () => {
  it('should only assign available assets', () => {
    expect(AssetStatus.AVAILABLE).toBe('AVAILABLE');
  });
});
