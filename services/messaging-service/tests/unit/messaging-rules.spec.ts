import { MESSAGE_STATUS_TRANSITIONS } from '../../src/common/constants';
import { MessageStatus } from '../../src/common/enums';

describe('Message Status Transitions', () => {
  it('should allow SENT to DELIVERED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.SENT).toContain(MessageStatus.DELIVERED);
  });

  it('should allow DELIVERED to READ', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.DELIVERED).toContain(MessageStatus.READ);
  });

  it('should allow SENT to FAILED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.SENT).toContain(MessageStatus.FAILED);
  });

  it('should allow SENT to DELETED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.SENT).toContain(MessageStatus.DELETED);
  });

  it('should not allow transitions from DELETED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.DELETED).toHaveLength(0);
  });
});
