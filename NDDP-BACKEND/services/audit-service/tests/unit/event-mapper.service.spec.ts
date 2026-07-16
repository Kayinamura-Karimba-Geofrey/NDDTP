import { EventMapperService } from '../../src/modules/audit/event-mapper.service';
import { AuditAction, AuditOutcome, SecurityEventType } from '../../src/common/enums';

describe('EventMapperService', () => {
  let mapper: EventMapperService;

  beforeEach(() => {
    mapper = new EventMapperService();
  });

  it('should map auth login event', () => {
    const result = mapper.mapPlatformEvent({
      eventId: 'e1',
      eventType: 'auth.user.login.success',
      timestamp: new Date().toISOString(),
      correlationId: 'c1',
      source: 'nddtp-auth-service',
      version: '1.0',
      data: { userId: 'u1', email: 'user@defence.gov', ipAddress: '10.0.0.1' },
    });
    expect(result.category).toBe('AUTHENTICATION');
    expect(result.action).toBe(AuditAction.LOGIN);
    expect(result.outcome).toBe(AuditOutcome.SUCCESS);
    expect(result.userId).toBe('u1');
  });

  it('should map failed login as security event', () => {
    expect(mapper.isSecurityEvent('auth.user.login.failed')).toBe(true);
    expect(mapper.mapSecurityEventType('auth.user.login.failed')).toBe(SecurityEventType.LOGIN_FAILED);
  });

  it('should map user created event', () => {
    const result = mapper.mapPlatformEvent({
      eventId: 'e2',
      eventType: 'user.user.created',
      timestamp: new Date().toISOString(),
      correlationId: 'c2',
      source: 'nddtp-user-service',
      version: '1.0',
      data: { userId: 'u2', email: 'new@defence.gov' },
    });
    expect(result.category).toBe('USER_MANAGEMENT');
    expect(result.action).toBe(AuditAction.CREATE);
  });

  it('should map access denied event', () => {
    const result = mapper.mapPlatformEvent({
      eventId: 'e3',
      eventType: 'authorization.access.denied',
      timestamp: new Date().toISOString(),
      correlationId: 'c3',
      source: 'nddtp-authorization-service',
      version: '1.0',
      data: { userId: 'u3', permissionCode: 'users:delete:profile' },
    });
    expect(result.category).toBe('AUTHORIZATION');
    expect(result.outcome).toBe(AuditOutcome.FAILURE);
    expect(mapper.mapSecurityEventType('authorization.access.denied')).toBe(SecurityEventType.ACCESS_DENIED);
  });
});
