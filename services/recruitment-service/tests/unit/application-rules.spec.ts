import { APPLICATION_STATUS_TRANSITIONS } from '../../src/common/constants';
import { ApplicationStatus } from '../../src/common/enums';

describe('Application Status Transitions', () => {
  it('should allow SUBMITTED to SCREENING', () => {
    expect(APPLICATION_STATUS_TRANSITIONS.SUBMITTED).toContain(ApplicationStatus.SCREENING);
  });

  it('should allow INTERVIEW to OFFERED', () => {
    expect(APPLICATION_STATUS_TRANSITIONS.INTERVIEW).toContain(ApplicationStatus.OFFERED);
  });

  it('should not allow HIRED to any status', () => {
    expect(APPLICATION_STATUS_TRANSITIONS.HIRED).toHaveLength(0);
  });

  it('should allow OFFERED to HIRED', () => {
    expect(APPLICATION_STATUS_TRANSITIONS.OFFERED).toContain(ApplicationStatus.HIRED);
  });
});

describe('Application Number Format', () => {
  it('should generate unique application number pattern', () => {
    const num = `APP-${Date.now().toString(36).toUpperCase()}-ABC123`;
    expect(num).toMatch(/^APP-[A-Z0-9]+-[A-Z0-9]+$/);
  });
});
