import { EXPENDITURE_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ExpenditureStatus } from '../../src/common/enums';

describe('Expenditure Status Transitions', () => {
  it('should allow DRAFT to SUBMITTED', () => {
    expect(EXPENDITURE_STATUS_TRANSITIONS.DRAFT).toContain(ExpenditureStatus.SUBMITTED);
  });

  it('should allow SUBMITTED to APPROVED', () => {
    expect(EXPENDITURE_STATUS_TRANSITIONS.SUBMITTED).toContain(ExpenditureStatus.APPROVED);
  });

  it('should allow SUBMITTED to REJECTED', () => {
    expect(EXPENDITURE_STATUS_TRANSITIONS.SUBMITTED).toContain(ExpenditureStatus.REJECTED);
  });

  it('should allow APPROVED to PAID', () => {
    expect(EXPENDITURE_STATUS_TRANSITIONS.APPROVED).toContain(ExpenditureStatus.PAID);
  });

  it('should allow DRAFT to CANCELLED', () => {
    expect(EXPENDITURE_STATUS_TRANSITIONS.DRAFT).toContain(ExpenditureStatus.CANCELLED);
  });

  it('should not allow transitions from PAID', () => {
    expect(EXPENDITURE_STATUS_TRANSITIONS.PAID).toHaveLength(0);
  });
});
