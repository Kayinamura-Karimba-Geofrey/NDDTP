import { CONVERSATION_STATUS_TRANSITIONS, MESSAGE_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ConversationStatus, MessageStatus } from '../../src/common/enums';

describe('Conversation Status Transitions', () => {
  it('should allow ACTIVE to CLOSED', () => {
    expect(CONVERSATION_STATUS_TRANSITIONS.ACTIVE).toContain(ConversationStatus.CLOSED);
  });

  it('should allow ACTIVE to ARCHIVED', () => {
    expect(CONVERSATION_STATUS_TRANSITIONS.ACTIVE).toContain(ConversationStatus.ARCHIVED);
  });

  it('should not allow transitions from ARCHIVED', () => {
    expect(CONVERSATION_STATUS_TRANSITIONS.ARCHIVED).toHaveLength(0);
  });
});

describe('Message Status Transitions', () => {
  it('should allow PENDING to COMPLETED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.PENDING).toContain(MessageStatus.COMPLETED);
  });

  it('should allow PENDING to FAILED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.PENDING).toContain(MessageStatus.FAILED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(MESSAGE_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
