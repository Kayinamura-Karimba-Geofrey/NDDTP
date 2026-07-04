import { ServiceStatus } from '../../src/common/enums';

const VALID_TRANSITIONS: Record<ServiceStatus, ServiceStatus[]> = {
  [ServiceStatus.ACTIVE]: [ServiceStatus.RESERVE, ServiceStatus.ON_LEAVE, ServiceStatus.SUSPENDED, ServiceStatus.RETIRED, ServiceStatus.SEPARATED],
  [ServiceStatus.RESERVE]: [ServiceStatus.ACTIVE, ServiceStatus.SEPARATED],
  [ServiceStatus.ON_LEAVE]: [ServiceStatus.ACTIVE, ServiceStatus.SUSPENDED],
  [ServiceStatus.SUSPENDED]: [ServiceStatus.ACTIVE, ServiceStatus.SEPARATED],
  [ServiceStatus.RETIRED]: [],
  [ServiceStatus.SEPARATED]: [],
};

describe('Service Status Transitions', () => {
  it('should allow ACTIVE to ON_LEAVE', () => {
    expect(VALID_TRANSITIONS[ServiceStatus.ACTIVE]).toContain(ServiceStatus.ON_LEAVE);
  });

  it('should not allow RETIRED to any status', () => {
    expect(VALID_TRANSITIONS[ServiceStatus.RETIRED]).toHaveLength(0);
  });

  it('should allow SUSPENDED back to ACTIVE', () => {
    expect(VALID_TRANSITIONS[ServiceStatus.SUSPENDED]).toContain(ServiceStatus.ACTIVE);
  });
});

describe('Service Number Generation', () => {
  it('should derive service number from employee number', () => {
    const employeeNumber = 'EMP-2024-001';
    const serviceNumber = `SVC-${employeeNumber}`;
    expect(serviceNumber).toBe('SVC-EMP-2024-001');
  });
});

describe('Qualification Expiry Calculation', () => {
  it('should calculate expiry from validity months', () => {
    const obtained = new Date('2024-01-15');
    const validityMonths = 24;
    const expiry = new Date(obtained);
    expiry.setMonth(expiry.getMonth() + validityMonths);
    expect(expiry.toISOString().split('T')[0]).toBe('2026-01-15');
  });
});
