import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { IntegrityService } from '../../src/modules/audit/integrity.service';
import { AuditAction, AuditOutcome, AuditSeverity } from '../../src/common/enums';

describe('IntegrityService', () => {
  let service: IntegrityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrityService,
        { provide: ConfigService, useValue: { get: () => 'test-integrity-secret-key-32chars' } },
      ],
    }).compile();
    service = module.get(IntegrityService);
  });

  it('should compute deterministic hash', () => {
    const log = {
      eventId: 'evt-1',
      eventType: 'auth.user.login.success',
      source: 'nddtp-auth-service',
      category: 'AUTHENTICATION',
      action: AuditAction.LOGIN,
      outcome: AuditOutcome.SUCCESS,
      severity: AuditSeverity.INFO,
      userId: 'user-1',
      actorEmail: 'test@defence.gov',
      resourceType: null,
      resourceId: null,
      correlationId: 'corr-1',
      payload: { ipAddress: '127.0.0.1' },
      previousHash: null,
    };
    const hash1 = service.computeHash(log, null);
    const hash2 = service.computeHash(log, null);
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });

  it('should produce different hash when previous hash changes', () => {
    const log = {
      eventType: 'user.user.created',
      source: 'nddtp-user-service',
      category: 'USER_MANAGEMENT',
      action: AuditAction.CREATE,
      outcome: AuditOutcome.SUCCESS,
      severity: AuditSeverity.INFO,
    };
    const hash1 = service.computeHash(log, null);
    const hash2 = service.computeHash(log, 'abc123');
    expect(hash1).not.toBe(hash2);
  });

  it('should verify valid integrity hash', () => {
    const partial = {
      eventType: 'auth.user.logout',
      source: 'nddtp-auth-service',
      category: 'AUTHENTICATION',
      action: AuditAction.LOGOUT,
      outcome: AuditOutcome.SUCCESS,
      severity: AuditSeverity.INFO,
      userId: 'user-1',
      previousHash: 'GENESIS',
    };
    const integrityHash = service.computeHash(partial, 'GENESIS');
    const log = { ...partial, integrityHash } as Parameters<IntegrityService['verify']>[0];
    expect(service.verify(log)).toBe(true);
  });
});
