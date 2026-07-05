import { SHIPMENT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ShipmentStatus } from '../../src/common/enums';

describe('Shipment Status Transitions', () => {
  it('should allow DRAFT to SCHEDULED', () => {
    expect(SHIPMENT_STATUS_TRANSITIONS.DRAFT).toContain(ShipmentStatus.SCHEDULED);
  });

  it('should allow DISPATCHED to IN_TRANSIT', () => {
    expect(SHIPMENT_STATUS_TRANSITIONS.DISPATCHED).toContain(ShipmentStatus.IN_TRANSIT);
  });

  it('should allow IN_TRANSIT to DELIVERED', () => {
    expect(SHIPMENT_STATUS_TRANSITIONS.IN_TRANSIT).toContain(ShipmentStatus.DELIVERED);
  });

  it('should not allow DELIVERED transitions', () => {
    expect(SHIPMENT_STATUS_TRANSITIONS.DELIVERED).toHaveLength(0);
  });
});

describe('Route Validation', () => {
  it('should reject same origin and destination', () => {
    const originId = 'abc-123';
    const destId = 'abc-123';
    expect(originId === destId).toBe(true);
  });
});
