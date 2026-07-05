import { REQUEST_STATUS_TRANSITIONS, WORK_ORDER_STATUS_TRANSITIONS } from '../../src/common/constants';
import { RequestStatus, WorkOrderStatus } from '../../src/common/enums';

describe('Request Status Transitions', () => {
  it('should allow SUBMITTED to APPROVED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.SUBMITTED).toContain(RequestStatus.APPROVED);
  });

  it('should allow APPROVED to IN_PROGRESS', () => {
    expect(REQUEST_STATUS_TRANSITIONS.APPROVED).toContain(RequestStatus.IN_PROGRESS);
  });

  it('should allow IN_PROGRESS to COMPLETED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.IN_PROGRESS).toContain(RequestStatus.COMPLETED);
  });
});

describe('Work Order Status Transitions', () => {
  it('should allow DRAFT to SCHEDULED', () => {
    expect(WORK_ORDER_STATUS_TRANSITIONS.DRAFT).toContain(WorkOrderStatus.SCHEDULED);
  });

  it('should allow SCHEDULED to IN_PROGRESS', () => {
    expect(WORK_ORDER_STATUS_TRANSITIONS.SCHEDULED).toContain(WorkOrderStatus.IN_PROGRESS);
  });

  it('should allow IN_PROGRESS to COMPLETED', () => {
    expect(WORK_ORDER_STATUS_TRANSITIONS.IN_PROGRESS).toContain(WorkOrderStatus.COMPLETED);
  });
});
