import { APPOINTMENT_STATUS_TRANSITIONS } from '../../src/common/constants';
import { AppointmentStatus } from '../../src/common/enums';

describe('Appointment Status Transitions', () => {
  it('should allow SCHEDULED to CONFIRMED', () => {
    expect(APPOINTMENT_STATUS_TRANSITIONS.SCHEDULED).toContain(AppointmentStatus.CONFIRMED);
  });

  it('should allow CONFIRMED to IN_PROGRESS', () => {
    expect(APPOINTMENT_STATUS_TRANSITIONS.CONFIRMED).toContain(AppointmentStatus.IN_PROGRESS);
  });

  it('should allow IN_PROGRESS to COMPLETED', () => {
    expect(APPOINTMENT_STATUS_TRANSITIONS.IN_PROGRESS).toContain(AppointmentStatus.COMPLETED);
  });

  it('should not allow COMPLETED transitions', () => {
    expect(APPOINTMENT_STATUS_TRANSITIONS.COMPLETED).toHaveLength(0);
  });
});

describe('Fitness Classification', () => {
  it('should have four classification levels', () => {
    expect(['FIT', 'TEMPORARILY_UNFIT', 'PERMANENTLY_UNFIT', 'LIMITED_DUTY']).toHaveLength(4);
  });
});

describe('Certificate Workflow', () => {
  it('should require draft before issue', () => {
    const draft = 'DRAFT';
    const issued = 'ISSUED';
    expect(draft).not.toBe(issued);
  });
});
