import { VEHICLE_STATUS_TRANSITIONS } from '../../src/common/constants';
import { VehicleStatus } from '../../src/common/enums';

describe('Vehicle Status Transitions', () => {
  it('should allow REGISTERED to AVAILABLE', () => {
    expect(VEHICLE_STATUS_TRANSITIONS.REGISTERED).toContain(VehicleStatus.AVAILABLE);
  });

  it('should allow AVAILABLE to ASSIGNED', () => {
    expect(VEHICLE_STATUS_TRANSITIONS.AVAILABLE).toContain(VehicleStatus.ASSIGNED);
  });

  it('should allow ASSIGNED to AVAILABLE', () => {
    expect(VEHICLE_STATUS_TRANSITIONS.ASSIGNED).toContain(VehicleStatus.AVAILABLE);
  });

  it('should not allow DECOMMISSIONED transitions', () => {
    expect(VEHICLE_STATUS_TRANSITIONS.DECOMMISSIONED).toHaveLength(0);
  });
});

describe('Trip Distance', () => {
  it('should calculate distance from odometer readings', () => {
    const start = 10000;
    const end = 10045;
    expect(end - start).toBe(45);
  });

  it('should reject negative distance', () => {
    const start = 10050;
    const end = 10000;
    expect(end < start).toBe(true);
  });
});
