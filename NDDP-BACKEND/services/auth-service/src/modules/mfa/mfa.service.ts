import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';
import { MfaRepository } from './repositories/mfa.repository';
import { PasswordService } from '../password/password.service';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { MfaStatus } from '../../common/enums';
import {
  InvalidMfaCodeException,
  InvalidCredentialsException,
} from '../../common/exceptions/auth.exceptions';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class MfaService {
  private readonly logger = new Logger(MfaService.name);

  constructor(
    private readonly mfaRepository: MfaRepository,
    private readonly passwordService: PasswordService,
    private readonly credentialRepository: AuthCredentialRepository,
    private readonly configService: ConfigService,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
  ) {
    authenticator.options = { window: 1 };
  }

  async initiateSetup(credentialId: string, email: string) {
    const issuer = this.configService.get<string>('security.mfaIssuer') || 'NDDTP';
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(email, issuer, secret);
    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);

    await this.mfaRepository.createOrUpdate(credentialId, {
      secretEncrypted: this.encryptSecret(secret),
      status: MfaStatus.PENDING_SETUP,
    });

    const backupCodes = Array.from({ length: 10 }, () =>
      this.passwordService.generateBackupCode(),
    );

    await this.redisService.set(
      CACHE_KEYS.MFA_SETUP(credentialId),
      JSON.stringify({ secret, backupCodes }),
      600,
    );

    return { secret, qrCodeUrl, backupCodes };
  }

  async verifyAndEnable(credentialId: string, code: string, correlationId?: string) {
    const cached = await this.redisService.get(CACHE_KEYS.MFA_SETUP(credentialId));
    if (!cached) {
      throw new InvalidMfaCodeException();
    }

    const { secret, backupCodes } = JSON.parse(cached) as {
      secret: string;
      backupCodes: string[];
    };

    if (!this.verifyTotp(secret, code)) {
      throw new InvalidMfaCodeException();
    }

    const mfaSetting = await this.mfaRepository.createOrUpdate(credentialId, {
      secretEncrypted: this.encryptSecret(secret),
      status: MfaStatus.ENABLED,
      enabledAt: new Date(),
    });

    const codeHashes = backupCodes.map((c) => this.passwordService.hashToken(c));
    await this.mfaRepository.deleteBackupCodes(mfaSetting.id);
    await this.mfaRepository.createBackupCodes(mfaSetting.id, codeHashes);

    await this.redisService.del(CACHE_KEYS.MFA_SETUP(credentialId));

    const credential = await this.credentialRepository.findById(credentialId);
    if (credential) {
      await this.eventPublisher.publishMfaEnabled(
        { userId: credential.userId, method: 'TOTP' },
        correlationId,
      );
    }

    return { enabled: true };
  }

  async verifyCode(credentialId: string, code: string): Promise<boolean> {
    const mfaSetting = await this.mfaRepository.findByCredentialId(credentialId);

    if (!mfaSetting || mfaSetting.status !== MfaStatus.ENABLED) {
      return false;
    }

    if (mfaSetting.secretEncrypted && this.verifyTotp(this.decryptSecret(mfaSetting.secretEncrypted), code)) {
      await this.mfaRepository.updateLastUsed(credentialId);
      return true;
    }

    const codeHash = this.passwordService.hashToken(code);
    const backupCode = await this.mfaRepository.findUnusedBackupCode(mfaSetting.id, codeHash);

    if (backupCode) {
      await this.mfaRepository.markBackupCodeUsed(backupCode.id);
      return true;
    }

    return false;
  }

  async disable(credentialId: string, password: string, code: string, correlationId?: string) {
    const credential = await this.credentialRepository.findById(credentialId);
    if (!credential) {
      throw new InvalidCredentialsException();
    }

    const validPassword = await this.passwordService.comparePassword(
      password,
      credential.passwordHash,
    );

    if (!validPassword) {
      throw new InvalidCredentialsException();
    }

    const validCode = await this.verifyCode(credentialId, code);
    if (!validCode) {
      throw new InvalidMfaCodeException();
    }

    await this.mfaRepository.disableMfa(credentialId);

    await this.eventPublisher.publishMfaDisabled(
      { userId: credential.userId },
      correlationId,
    );

    return { disabled: true };
  }

  async isMfaEnabled(credentialId: string): Promise<boolean> {
    const mfaSetting = await this.mfaRepository.findByCredentialId(credentialId);
    return mfaSetting?.status === MfaStatus.ENABLED;
  }

  private verifyTotp(secret: string, code: string): boolean {
    return authenticator.verify({ token: code, secret });
  }

  private encryptSecret(secret: string): string {
    return Buffer.from(secret).toString('base64');
  }

  private decryptSecret(encrypted: string): string {
    return Buffer.from(encrypted, 'base64').toString('utf8');
  }
}
