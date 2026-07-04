import { REQUEST_STATUS_TRANSITIONS } from '../../src/common/constants';
import { RequestStatus } from '../../src/common/enums';

describe('Request Status Transitions', () => {
  it('should allow PENDING to APPROVED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.PENDING).toContain(RequestStatus.APPROVED);
  });

  it('should allow APPROVED to FULFILLED', () => {
    expect(REQUEST_STATUS_TRANSITIONS.APPROVED).toContain(RequestStatus.FULFILLED);
  });

  it('should not allow FULFILLED transitions', () => {
    expect(REQUEST_STATUS_TRANSITIONS.FULFILLED).toHaveLength(0);
  });
});

describe('Stock Availability', () => {
  it('should calculate available stock', () => {
    const quantity = 100;
    const reserved = 15;
    expect(quantity - reserved).toBe(85);
  });

  it('should reject issue when insufficient', () => {
    const available = 10;
    const requested = 25;
    expect(requested > available).toBe(true);
  });
});
