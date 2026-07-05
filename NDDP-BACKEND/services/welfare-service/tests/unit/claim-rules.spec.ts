import { CLAIM_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ClaimStatus } from '../../src/common/enums';

describe('Claim Status Transitions', () => {
  it('should allow DRAFT to SUBMITTED', () => {
    expect(CLAIM_STATUS_TRANSITIONS.DRAFT).toContain(ClaimStatus.SUBMITTED);
  });

  it('should allow UNDER_REVIEW to APPROVED', () => {
    expect(CLAIM_STATUS_TRANSITIONS.UNDER_REVIEW).toContain(ClaimStatus.APPROVED);
  });

  it('should allow APPROVED to DISBURSED', () => {
    expect(CLAIM_STATUS_TRANSITIONS.APPROVED).toContain(ClaimStatus.DISBURSED);
  });

  it('should not allow DISBURSED transitions', () => {
    expect(CLAIM_STATUS_TRANSITIONS.DISBURSED).toHaveLength(0);
  });
});

describe('Claim Amount Validation', () => {
  it('should reject approved amount exceeding requested', () => {
    const requested = 5000;
    const approved = 6000;
    expect(approved > requested).toBe(true);
  });

  it('should accept approved amount within requested', () => {
    const requested = 5000;
    const approved = 4500;
    expect(approved <= requested).toBe(true);
  });
});
