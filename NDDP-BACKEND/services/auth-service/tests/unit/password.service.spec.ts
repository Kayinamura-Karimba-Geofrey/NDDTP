import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../../src/modules/password/password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'security.bcryptRounds') return 4;
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should hash and verify password', async () => {
    const password = 'SecureP@ssw0rd123!';
    const hash = await service.hashPassword(password);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);

    const isValid = await service.comparePassword(password, hash);
    expect(isValid).toBe(true);
  });

  it('should reject invalid password', async () => {
    const hash = await service.hashPassword('SecureP@ssw0rd123!');
    const isValid = await service.comparePassword('WrongPassword!', hash);
    expect(isValid).toBe(false);
  });

  it('should generate secure token', () => {
    const token1 = service.generateSecureToken();
    const token2 = service.generateSecureToken();

    expect(token1).toHaveLength(64);
    expect(token2).toHaveLength(64);
    expect(token1).not.toBe(token2);
  });

  it('should hash token consistently', () => {
    const token = 'test-token';
    const hash1 = service.hashToken(token);
    const hash2 = service.hashToken(token);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });

  it('should generate backup codes', () => {
    const code = service.generateBackupCode();
    expect(code).toHaveLength(8);
    expect(code).toMatch(/^[A-Z2-9]+$/);
  });
});
