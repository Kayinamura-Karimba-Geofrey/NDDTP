import { ANNOUNCEMENT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { AnnouncementStatus } from '../../src/common/enums';

describe('Announcement Status Transitions', () => {
  it('should allow DRAFT to PUBLISHED', () => {
    expect(ANNOUNCEMENT_STATUS_TRANSITIONS.DRAFT).toContain(AnnouncementStatus.PUBLISHED);
  });

  it('should allow PUBLISHED to EXPIRED', () => {
    expect(ANNOUNCEMENT_STATUS_TRANSITIONS.PUBLISHED).toContain(AnnouncementStatus.EXPIRED);
  });

  it('should allow DRAFT to WITHDRAWN', () => {
    expect(ANNOUNCEMENT_STATUS_TRANSITIONS.DRAFT).toContain(AnnouncementStatus.WITHDRAWN);
  });

  it('should allow PUBLISHED to WITHDRAWN', () => {
    expect(ANNOUNCEMENT_STATUS_TRANSITIONS.PUBLISHED).toContain(AnnouncementStatus.WITHDRAWN);
  });

  it('should not allow transitions from EXPIRED', () => {
    expect(ANNOUNCEMENT_STATUS_TRANSITIONS.EXPIRED).toHaveLength(0);
  });
});
