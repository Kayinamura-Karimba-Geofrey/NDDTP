import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../src/modules/auth/auth.service';
import { AuthCredentialRepository } from '../../src/modules/credentials/repositories/auth-credential.repository';
import { UserSessionRepository } from '../../src/modules/sessions/repositories/user-session.repository';
import { LoginAttemptRepository } from '../../src/modules/auth/repositories/login-attempt.repository';
import { PasswordResetTokenRepository } from '../../src/modules/password/repositories/password-reset-token.repository';
import { PasswordService } from '../../src/modules/password/password.service';
import { TokenService } from '../../src/modules/tokens/token.service';
import { MfaService } from '../../src/modules/mfa/mfa.service';
import { EventPublisherService } from '../../src/events/event-publisher.service';
import { RedisService } from '../../src/modules/cache/redis.module';
import { DataSource } from 'typeorm';
import { AccountStatus } from '../../src/common/enums';
import { DuplicateEmailException } from '../../src/common/exceptions/auth.exceptions';

describe('AuthService', () => {
  let service: AuthService;
  let credentialRepository: jest.Mocked<AuthCredentialRepository>;
  let passwordService: jest.Mocked<PasswordService>;
  let eventPublisher: jest.Mocked<EventPublisherService>;

  const mockCredential = {
    id: 'cred-uuid',
    userId: 'user-uuid',
    email: 'test@defence.gov',
    passwordHash: 'hashed',
    status: AccountStatus.ACTIVE,
    emailVerified: true,
    failedLoginAttempts: 0,
    lockedUntil: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthCredentialRepository,
          useValue: {
            findByEmail: jest.fn(),
            findByUserId: jest.fn(),
            create: jest.fn(),
            resetFailedAttempts: jest.fn(),
            incrementFailedAttempts: jest.fn(),
            lockAccount: jest.fn(),
            updateLastLogin: jest.fn(),
          },
        },
        {
          provide: UserSessionRepository,
          useValue: {
            create: jest.fn(),
            markMfaVerified: jest.fn(),
            revokeSession: jest.fn(),
            revokeAllByCredentialId: jest.fn(),
          },
        },
        {
          provide: LoginAttemptRepository,
          useValue: { create: jest.fn() },
        },
        {
          provide: PasswordResetTokenRepository,
          useValue: {
            create: jest.fn(),
            invalidateAllByCredentialId: jest.fn(),
            findValidByTokenHash: jest.fn(),
            markAsUsed: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            hashPassword: jest.fn(),
            comparePassword: jest.fn(),
            generateSecureToken: jest.fn(),
            hashToken: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            generateTokenPair: jest.fn(),
            refreshTokens: jest.fn(),
            revokeRefreshToken: jest.fn(),
            generateMfaToken: jest.fn(),
            verifyMfaToken: jest.fn(),
          },
        },
        {
          provide: MfaService,
          useValue: {
            isMfaEnabled: jest.fn().mockResolvedValue(false),
            verifyCode: jest.fn(),
          },
        },
        {
          provide: EventPublisherService,
          useValue: {
            publishUserRegistered: jest.fn(),
            publishLoginSuccess: jest.fn(),
            publishLoginFailed: jest.fn(),
            publishLogout: jest.fn(),
            publishPasswordChanged: jest.fn(),
            publishPasswordResetRequested: jest.fn(),
            publishPasswordResetCompleted: jest.fn(),
            publishAccountLocked: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: { set: jest.fn(), del: jest.fn(), get: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, unknown> = {
                'security.maxLoginAttempts': 5,
                'security.lockoutDurationMinutes': 30,
                'security.passwordResetTokenExpiresHours': 1,
                'jwt.refreshExpiresIn': '7d',
              };
              return config[key];
            }),
          },
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn((cb) => cb()),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    credentialRepository = module.get(AuthCredentialRepository);
    passwordService = module.get(PasswordService);
    eventPublisher = module.get(EventPublisherService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      credentialRepository.findByEmail.mockResolvedValue(null);
      credentialRepository.findByUserId.mockResolvedValue(null);
      passwordService.hashPassword.mockResolvedValue('hashed-password');
      credentialRepository.create.mockResolvedValue({
        ...mockCredential,
        status: AccountStatus.PENDING_VERIFICATION,
      } as never);

      const result = await service.register({
        userId: 'user-uuid',
        email: 'test@defence.gov',
        password: 'SecureP@ssw0rd123!',
      });

      expect(result.email).toBe('test@defence.gov');
      expect(eventPublisher.publishUserRegistered).toHaveBeenCalled();
    });

    it('should throw on duplicate email', async () => {
      credentialRepository.findByEmail.mockResolvedValue(mockCredential as never);

      await expect(
        service.register({
          userId: 'user-uuid',
          email: 'test@defence.gov',
          password: 'SecureP@ssw0rd123!',
        }),
      ).rejects.toThrow(DuplicateEmailException);
    });
  });
});
