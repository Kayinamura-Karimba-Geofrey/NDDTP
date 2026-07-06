import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { UserSessionRepository } from '../sessions/repositories/user-session.repository';
import { LoginAttemptRepository } from './repositories/login-attempt.repository';
import { PasswordResetTokenRepository } from '../password/repositories/password-reset-token.repository';
import { PasswordService } from '../password/password.service';
import { TokenService } from '../tokens/token.service';
import { MfaService } from '../mfa/mfa.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import {
  RegisterDto,
  LoginDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyMfaDto,
} from './dto/auth.dto';
import {
  AccountStatus,
  SessionStatus,
  LoginAttemptResult,
} from '../../common/enums';
import {
  InvalidCredentialsException,
  AccountLockedException,
  AccountInactiveException,
  MfaRequiredException,
  InvalidMfaCodeException,
  DuplicateEmailException,
  PasswordResetTokenInvalidException,
  ResourceNotFoundException,
} from '../../common/exceptions/auth.exceptions';
import { DeviceInfo } from '../../common/interfaces';
import { CACHE_KEYS } from '../../common/constants';
import { AuthCredential } from '../../database/entities/auth-credential.entity';
import { AuthorizationLookupService } from './authorization-lookup.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly credentialRepository: AuthCredentialRepository,
    private readonly sessionRepository: UserSessionRepository,
    private readonly loginAttemptRepository: LoginAttemptRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly mfaService: MfaService,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
    private readonly authorizationLookup: AuthorizationLookupService,
  ) {}

  async register(dto: RegisterDto, correlationId?: string) {
    const existing = await this.credentialRepository.findByEmail(dto.email);
    if (existing) {
      throw new DuplicateEmailException(dto.email);
    }

    const existingUserId = await this.credentialRepository.findByUserId(dto.userId);
    if (existingUserId) {
      throw new DuplicateEmailException(dto.email);
    }

    const passwordHash = await this.passwordService.hashPassword(dto.password);

    const credential = await this.credentialRepository.create({
      userId: dto.userId,
      email: dto.email.toLowerCase(),
      passwordHash,
      status: AccountStatus.PENDING_VERIFICATION,
      lastPasswordChangeAt: new Date(),
    });

    await this.eventPublisher.publishUserRegistered(
      {
        userId: credential.userId,
        email: credential.email,
        credentialId: credential.id,
      },
      correlationId,
    );

    this.logger.log(`User registered: ${credential.userId}`);

    return {
      id: credential.id,
      userId: credential.userId,
      email: credential.email,
      status: credential.status,
    };
  }

  async validateCredentials(email: string, password: string): Promise<AuthCredential | null> {
    const credential = await this.credentialRepository.findByEmail(email);
    if (!credential) return null;

    const isValid = await this.passwordService.comparePassword(password, credential.passwordHash);
    if (!isValid) return null;

    return credential;
  }

  async login(dto: LoginDto, deviceInfo: DeviceInfo, correlationId?: string) {
    const credential = await this.credentialRepository.findByEmail(dto.email);

    if (!credential) {
      await this.recordLoginAttempt(null, dto.email, LoginAttemptResult.FAILED_INVALID_CREDENTIALS, deviceInfo);
      await this.eventPublisher.publishLoginFailed(
        { email: dto.email, reason: 'invalid_credentials', ipAddress: deviceInfo.ipAddress },
        correlationId,
      );
      throw new InvalidCredentialsException();
    }

    if (credential.status === AccountStatus.LOCKED) {
      if (credential.lockedUntil && credential.lockedUntil > new Date()) {
        await this.recordLoginAttempt(credential.id, dto.email, LoginAttemptResult.FAILED_ACCOUNT_LOCKED, deviceInfo);
        throw new AccountLockedException(credential.lockedUntil);
      }
      await this.credentialRepository.unlockAccount(credential.id);
    }

    if (credential.status !== AccountStatus.ACTIVE) {
      await this.recordLoginAttempt(credential.id, dto.email, LoginAttemptResult.FAILED_ACCOUNT_INACTIVE, deviceInfo);
      throw new AccountInactiveException(credential.status);
    }

    const isValid = await this.passwordService.comparePassword(dto.password, credential.passwordHash);

    if (!isValid) {
      await this.handleFailedLogin(credential, dto.email, deviceInfo, correlationId);
      throw new InvalidCredentialsException();
    }

    await this.credentialRepository.resetFailedAttempts(credential.id);

    const mfaEnabled = await this.mfaService.isMfaEnabled(credential.id);

    if (mfaEnabled) {
      const session = await this.createSession(credential.id, deviceInfo, false);
      const mfaToken = this.tokenService.generateMfaToken(credential.userId, session.id);

      await this.recordLoginAttempt(credential.id, dto.email, LoginAttemptResult.FAILED_MFA_REQUIRED, deviceInfo);

      throw new MfaRequiredException(mfaToken);
    }

    return this.completeLogin(credential, deviceInfo, correlationId);
  }

  async verifyMfa(dto: VerifyMfaDto, deviceInfo: DeviceInfo, correlationId?: string) {
    const { sub: userId, sessionId } = this.tokenService.verifyMfaToken(dto.mfaToken);

    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new InvalidCredentialsException();
    }

    const isValid = await this.mfaService.verifyCode(credential.id, dto.code);

    if (!isValid) {
      await this.recordLoginAttempt(
        credential.id,
        credential.email,
        LoginAttemptResult.FAILED_MFA_INVALID,
        deviceInfo,
      );
      throw new InvalidMfaCodeException();
    }

    await this.sessionRepository.markMfaVerified(sessionId);

    return this.completeLogin(credential, deviceInfo, correlationId, sessionId);
  }

  async refreshToken(refreshToken: string, deviceInfo: DeviceInfo, correlationId?: string) {
    return this.tokenService.refreshTokens(refreshToken, deviceInfo, correlationId);
  }

  async logout(userId: string, sessionId: string, refreshToken?: string, correlationId?: string) {
    await this.sessionRepository.revokeSession(sessionId, 'User logout');

    if (refreshToken) {
      await this.tokenService.revokeRefreshToken(refreshToken);
    }

    await this.redisService.del(CACHE_KEYS.USER_SESSION(sessionId));

    await this.eventPublisher.publishLogout(
      { userId, sessionId },
      correlationId,
    );

    return { message: 'Logged out successfully' };
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
    correlationId?: string,
  ) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    const isValid = await this.passwordService.comparePassword(
      dto.currentPassword,
      credential.passwordHash,
    );

    if (!isValid) {
      throw new InvalidCredentialsException('Current password is incorrect');
    }

    const passwordHash = await this.passwordService.hashPassword(dto.newPassword);

    await this.dataSource.transaction(async () => {
      await this.credentialRepository.updatePassword(credential.id, passwordHash);
      await this.sessionRepository.revokeAllByCredentialId(credential.id, 'Password changed');
    });

    await this.eventPublisher.publishPasswordChanged(
      { userId: credential.userId },
      correlationId,
    );

    return { message: 'Password changed successfully. Please login again.' };
  }

  async forgotPassword(dto: ForgotPasswordDto, ipAddress?: string, correlationId?: string) {
    const credential = await this.credentialRepository.findByEmail(dto.email);

    if (credential) {
      const token = this.passwordService.generateSecureToken();
      const tokenHash = this.passwordService.hashToken(token);
      const expiresHours =
        this.configService.get<number>('security.passwordResetTokenExpiresHours') || 1;

      await this.passwordResetTokenRepository.invalidateAllByCredentialId(credential.id);
      await this.passwordResetTokenRepository.create({
        credentialId: credential.id,
        tokenHash,
        expiresAt: new Date(Date.now() + expiresHours * 60 * 60 * 1000),
        ipAddress: ipAddress || null,
      });

      await this.redisService.set(
        CACHE_KEYS.PASSWORD_RESET(tokenHash),
        credential.id,
        expiresHours * 3600,
      );

      await this.eventPublisher.publishPasswordResetRequested(
        {
          userId: credential.userId,
          email: credential.email,
          resetToken: token,
        },
        correlationId,
      );
    }

    return {
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  async resetPassword(dto: ResetPasswordDto, correlationId?: string) {
    const tokenHash = this.passwordService.hashToken(dto.token);
    const resetToken = await this.passwordResetTokenRepository.findValidByTokenHash(tokenHash);

    if (!resetToken || resetToken.expiresAt < new Date()) {
      throw new PasswordResetTokenInvalidException();
    }

    const passwordHash = await this.passwordService.hashPassword(dto.newPassword);

    await this.dataSource.transaction(async () => {
      await this.credentialRepository.updatePassword(resetToken.credentialId, passwordHash);
      await this.passwordResetTokenRepository.markAsUsed(resetToken.id);
      await this.sessionRepository.revokeAllByCredentialId(
        resetToken.credentialId,
        'Password reset',
      );
    });

    await this.redisService.del(CACHE_KEYS.PASSWORD_RESET(tokenHash));

    const credential = resetToken.credential;
    if (credential) {
      await this.eventPublisher.publishPasswordResetCompleted(
        { userId: credential.userId },
        correlationId,
      );
    }

    return { message: 'Password reset successfully' };
  }

  async getProfile(userId: string) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    const mfaEnabled = await this.mfaService.isMfaEnabled(credential.id);

    return {
      id: credential.id,
      userId: credential.userId,
      email: credential.email,
      status: credential.status,
      emailVerified: credential.emailVerified,
      lastLoginAt: credential.lastLoginAt,
      mfaEnabled,
    };
  }

  private async completeLogin(
    credential: AuthCredential,
    deviceInfo: DeviceInfo,
    correlationId?: string,
    existingSessionId?: string,
  ) {
    let sessionId = existingSessionId;

    if (!sessionId) {
      const session = await this.createSession(credential.id, deviceInfo, true);
      sessionId = session.id;
    }

    await this.credentialRepository.updateLastLogin(credential.id);

    const effective = await this.authorizationLookup.getEffectivePermissions(credential.userId);

    const tokens = await this.tokenService.generateTokenPair(
      credential,
      sessionId,
      effective.roles,
      effective.permissions,
      { ipAddress: deviceInfo.ipAddress, userAgent: deviceInfo.userAgent },
    );

    await this.recordLoginAttempt(
      credential.id,
      credential.email,
      LoginAttemptResult.SUCCESS,
      deviceInfo,
    );

    await this.eventPublisher.publishLoginSuccess(
      {
        userId: credential.userId,
        sessionId,
        ipAddress: deviceInfo.ipAddress,
      },
      correlationId,
    );

    return tokens;
  }

  private async createSession(
    credentialId: string,
    deviceInfo: DeviceInfo,
    mfaVerified: boolean,
  ) {
    const refreshExpiresIn =
      this.configService.get<string>('jwt.refreshExpiresIn') || '7d';
    const expiresMs = this.parseExpiry(refreshExpiresIn);

    return this.sessionRepository.create({
      credentialId,
      ipAddress: deviceInfo.ipAddress || null,
      userAgent: deviceInfo.userAgent || null,
      deviceId: deviceInfo.deviceId || null,
      platform: deviceInfo.platform || null,
      status: SessionStatus.ACTIVE,
      mfaVerified,
      expiresAt: new Date(Date.now() + expiresMs),
      lastActivityAt: new Date(),
    });
  }

  private async handleFailedLogin(
    credential: AuthCredential,
    email: string,
    deviceInfo: DeviceInfo,
    correlationId?: string,
  ) {
    await this.recordLoginAttempt(
      credential.id,
      email,
      LoginAttemptResult.FAILED_INVALID_CREDENTIALS,
      deviceInfo,
    );

    await this.credentialRepository.incrementFailedAttempts(credential.id);

    const maxAttempts =
      this.configService.get<number>('security.maxLoginAttempts') || 5;
    const lockoutMinutes =
      this.configService.get<number>('security.lockoutDurationMinutes') || 30;

    if (credential.failedLoginAttempts + 1 >= maxAttempts) {
      const lockedUntil = new Date(Date.now() + lockoutMinutes * 60 * 1000);
      await this.credentialRepository.lockAccount(credential.id, lockedUntil);

      await this.eventPublisher.publishAccountLocked(
        {
          userId: credential.userId,
          lockedUntil: lockedUntil.toISOString(),
          reason: 'max_failed_attempts',
        },
        correlationId,
      );
    }

    await this.eventPublisher.publishLoginFailed(
      {
        userId: credential.userId,
        email,
        reason: 'invalid_credentials',
        ipAddress: deviceInfo.ipAddress,
      },
      correlationId,
    );
  }

  private async recordLoginAttempt(
    credentialId: string | null,
    email: string,
    result: LoginAttemptResult,
    deviceInfo: DeviceInfo,
  ) {
    await this.loginAttemptRepository.create({
      credentialId,
      email: email.toLowerCase(),
      result,
      ipAddress: deviceInfo.ipAddress || null,
      userAgent: deviceInfo.userAgent || null,
      failureReason: result !== LoginAttemptResult.SUCCESS ? result : null,
    });
  }

  private parseExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 7 * 24 * 60 * 60 * 1000;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 7 * 24 * 60 * 60 * 1000;
    }
  }
}
