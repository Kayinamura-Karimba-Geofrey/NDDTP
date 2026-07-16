import { BOOKING_STATUS_TRANSITIONS } from '../../src/common/constants';
import { BookingStatus } from '../../src/common/enums';

describe('Booking Status Transitions', () => {
  it('should allow PENDING to APPROVED', () => {
    expect(BOOKING_STATUS_TRANSITIONS.PENDING).toContain(BookingStatus.APPROVED);
  });

  it('should allow PENDING to REJECTED', () => {
    expect(BOOKING_STATUS_TRANSITIONS.PENDING).toContain(BookingStatus.REJECTED);
  });

  it('should allow APPROVED to ACTIVE', () => {
    expect(BOOKING_STATUS_TRANSITIONS.APPROVED).toContain(BookingStatus.ACTIVE);
  });

  it('should allow ACTIVE to COMPLETED', () => {
    expect(BOOKING_STATUS_TRANSITIONS.ACTIVE).toContain(BookingStatus.COMPLETED);
  });

  it('should allow PENDING to CANCELLED', () => {
    expect(BOOKING_STATUS_TRANSITIONS.PENDING).toContain(BookingStatus.CANCELLED);
  });

  it('should not allow transitions from COMPLETED', () => {
    expect(BOOKING_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});
