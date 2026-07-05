import { ENTRY_STATUS_TRANSITIONS } from '../../src/common/constants';
import { EntryStatus } from '../../src/common/enums';

describe('Entry Status Transitions', () => {
  it('should allow DRAFT to ACTIVE', () => {
    expect(ENTRY_STATUS_TRANSITIONS.DRAFT).toContain(EntryStatus.ACTIVE);
  });

  it('should allow ACTIVE to DEPRECATED', () => {
    expect(ENTRY_STATUS_TRANSITIONS.ACTIVE).toContain(EntryStatus.DEPRECATED);
  });

  it('should allow DRAFT to DEPRECATED', () => {
    expect(ENTRY_STATUS_TRANSITIONS.DRAFT).toContain(EntryStatus.DEPRECATED);
  });

  it('should not allow transitions from DEPRECATED', () => {
    expect(ENTRY_STATUS_TRANSITIONS.DEPRECATED).toHaveLength(0);
  });
});
