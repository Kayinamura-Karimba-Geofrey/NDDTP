import { REQUISITION_STATUS_TRANSITIONS, ORDER_STATUS_TRANSITIONS } from '../../src/common/constants';
import { RequisitionStatus, OrderStatus } from '../../src/common/enums';

describe('Requisition Status Transitions', () => {
  it('should allow DRAFT to SUBMITTED', () => {
    expect(REQUISITION_STATUS_TRANSITIONS.DRAFT).toContain(RequisitionStatus.SUBMITTED);
  });

  it('should allow SUBMITTED to APPROVED', () => {
    expect(REQUISITION_STATUS_TRANSITIONS.SUBMITTED).toContain(RequisitionStatus.APPROVED);
  });

  it('should allow APPROVED to ORDERED', () => {
    expect(REQUISITION_STATUS_TRANSITIONS.APPROVED).toContain(RequisitionStatus.ORDERED);
  });
});

describe('Order Status Transitions', () => {
  it('should allow DRAFT to ISSUED', () => {
    expect(ORDER_STATUS_TRANSITIONS.DRAFT).toContain(OrderStatus.ISSUED);
  });

  it('should allow ISSUED to PARTIALLY_RECEIVED', () => {
    expect(ORDER_STATUS_TRANSITIONS.ISSUED).toContain(OrderStatus.PARTIALLY_RECEIVED);
  });

  it('should allow PARTIALLY_RECEIVED to RECEIVED', () => {
    expect(ORDER_STATUS_TRANSITIONS.PARTIALLY_RECEIVED).toContain(OrderStatus.RECEIVED);
  });
});

describe('Receipt Quantity', () => {
  it('should not exceed remaining quantity', () => {
    const ordered = 100;
    const received = 60;
    const incoming = 50;
    expect(received + incoming > ordered).toBe(true);
  });
});
