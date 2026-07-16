import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationEngineService } from '../../src/modules/authorization/authorization-engine.service';
import { UserRoleAssignmentRepository } from '../../src/modules/assignments/repositories/user-role-assignment.repository';
import { RoleRepository } from '../../src/modules/roles/repositories/role.repository';
import { RolePermissionRepository } from '../../src/modules/roles/repositories/role-permission.repository';
import { AuthorizationDecisionLogRepository } from '../../src/modules/authorization/repositories/authorization-decision-log.repository';
import { EventPublisherService } from '../../src/events/event-publisher.service';
import { RedisService } from '../../src/modules/cache/redis.module';
import { ConfigService } from '@nestjs/config';

describe('AuthorizationEngineService', () => {
  let service: AuthorizationEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizationEngineService,
        {
          provide: UserRoleAssignmentRepository,
          useValue: {
            findActiveByUserId: jest.fn().mockResolvedValue([
              { roleId: 'role-1', role: { code: 'EMPLOYEE' } },
            ]),
          },
        },
        {
          provide: RoleRepository,
          useValue: { findAncestors: jest.fn().mockResolvedValue([]) },
        },
        {
          provide: RolePermissionRepository,
          useValue: {
            findPermissionCodesByRoleIds: jest.fn().mockResolvedValue(['personnel:read:profile']),
            findByRoleId: jest.fn().mockResolvedValue([
              { permission: { code: 'personnel:read:profile' } },
            ]),
          },
        },
        {
          provide: AuthorizationDecisionLogRepository,
          useValue: { log: jest.fn() },
        },
        {
          provide: EventPublisherService,
          useValue: { publishAccessDenied: jest.fn() },
        },
        {
          provide: RedisService,
          useValue: { get: jest.fn().mockResolvedValue(null), set: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue(900) },
        },
      ],
    }).compile();

    service = module.get(AuthorizationEngineService);
  });

  it('should allow permission when user has it', async () => {
    const result = await service.checkPermission('user-1', 'personnel:read:profile');
    expect(result.allowed).toBe(true);
    expect(result.permission).toBe('personnel:read:profile');
  });

  it('should deny permission when user lacks it', async () => {
    const result = await service.checkPermission('user-1', 'finance:read:reports');
    expect(result.allowed).toBe(false);
  });

  it('should return effective permissions', async () => {
    const result = await service.getEffectivePermissions('user-1');
    expect(result.userId).toBe('user-1');
    expect(result.permissions).toContain('personnel:read:profile');
    expect(result.roles).toContain('EMPLOYEE');
  });
});
