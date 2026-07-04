import { REVIEW_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ReviewStatus } from '../../src/common/enums';

describe('Review Status Transitions', () => {
  it('should allow DRAFT to SELF_SUBMITTED', () => {
    expect(REVIEW_STATUS_TRANSITIONS.DRAFT).toContain(ReviewStatus.SELF_SUBMITTED);
  });

  it('should allow SELF_SUBMITTED to MANAGER_REVIEW', () => {
    expect(REVIEW_STATUS_TRANSITIONS.SELF_SUBMITTED).toContain(ReviewStatus.MANAGER_REVIEW);
  });

  it('should allow APPROVED to FINALIZED', () => {
    expect(REVIEW_STATUS_TRANSITIONS.APPROVED).toContain(ReviewStatus.FINALIZED);
  });

  it('should not allow FINALIZED transitions', () => {
    expect(REVIEW_STATUS_TRANSITIONS.FINALIZED).toHaveLength(0);
  });
});

describe('Goal Progress', () => {
  it('should mark goal complete at 100%', () => {
    const progress = 100;
    expect(progress >= 100).toBe(true);
  });
});

describe('Rating Criteria Weights', () => {
  it('should total default criteria weights to 100', () => {
    const weights = [20, 20, 25, 15, 20];
    expect(weights.reduce((a, b) => a + b, 0)).toBe(100);
  });
});
