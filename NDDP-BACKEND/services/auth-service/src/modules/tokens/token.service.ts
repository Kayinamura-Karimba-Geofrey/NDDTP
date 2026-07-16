import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload } from '../../common/interfaces';
import { PasswordService } from '../password/password.service';
import { RefreshTokenRepository } from '../tokens/repositories/refresh-token.repository';
import { UserSessionRepository } from '../sessions/repositories/user-session.repository';
import { AuthCredential } from '../../database/entities/auth-credential.entity';
import { InvalidRefreshTokenException } from '../../common/exceptions/auth.exceptions';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { EventPublisherService } from '../../events/event-publisher.service';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  sessionId: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly passwordService: PasswordService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly sessionRepository: UserSessionRepository,
    private readonly redisService: RedisService,
    private readonly eventPublisher: EventPublisherService,
  ) {}

  async generateTokenPair(
    credential: AuthCredential,
    sessionId: string,
    roles: string[] = [],
    permissions: string[] = [],
    deviceInfo?: { ipAddress?: string; userAgent?: string },
  ): Promise<TokenPair> {
    const accessExpiresIn = this.configService.get<string>('jwt.accessExpiresIn') || '15m';
    const refreshExpiresIn = this.configService.get<string>('jwt.refreshExpiresIn') || '7d';

    const accessPayload: JwtPayload = {
      sub: credential.userId,
      email: credential.email,
      sessionId,
      roles,
      permissions,
      type: 'access',
    };

    const refreshPayload: JwtPayload = {
      sub: credential.userId,
      email: credential.email,
      sessionId,
      roles,
      permissions,
      type: 'refresh',
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: accessExpiresIn,
      issuer: this.configService.get<string>('jwt.issuer'),
      audience: this.configService.get<string>('jwt.audience'),
    });

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: refreshExpiresIn,
      issuer: this.configService.get<string>('jwt.issuer'),
      audience: this.configService.get<string>('jwt.audience'),
    });

    const refreshTokenHash = this.passwordService.hashToken(refreshToken);
    const familyId = uuidv4();
    const refreshExpiresMs = this.parseExpiry(refreshExpiresIn);

    await this.refreshTokenRepository.create({
      credentialId: credential.id,
      sessionId,
      tokenHash: refreshTokenHash,
      familyId,
      expiresAt: new Date(Date.now() + refreshExpiresMs),
      ipAddress: deviceInfo?.ipAddress || null,
      userAgent: deviceInfo?.userAgent || null,
    });

    const redisTtl = this.configService.get<number>('redis.ttl.refreshToken') || 604800;
    await this.redisService.set(
      CACHE_KEYS.REFRESH_TOKEN(refreshTokenHash),
      JSON.stringify({ credentialId: credential.id, sessionId }),
      redisTtl,
    );

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.parseExpiry(accessExpiresIn) / 1000,
      sessionId,
    };
  }

  async refreshTokens(
    refreshToken: string,
    deviceInfo?: { ipAddress?: string; userAgent?: string },
    correlationId?: string,
  ): Promise<TokenPair> {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        issuer: this.configService.get<string>('jwt.issuer'),
        audience: this.configService.get<string>('jwt.audience'),
      });
    } catch {
      throw new InvalidRefreshTokenException();
    }

    if (payload.type !== 'refresh') {
      throw new InvalidRefreshTokenException();
    }

    const tokenHash = this.passwordService.hashToken(refreshToken);
    const storedToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

    if (!storedToken || storedToken.isRevoked) {
      if (storedToken?.familyId) {
        await this.refreshTokenRepository.revokeFamily(
          storedToken.familyId,
          'Token reuse detected - possible theft',
        );
      }
      throw new InvalidRefreshTokenException();
    }

    if (storedToken.expiresAt < new Date()) {
      throw new InvalidRefreshTokenException();
    }

    const session = await this.sessionRepository.findById(storedToken.sessionId);
    if (!session) {
      throw new InvalidRefreshTokenException();
    }

    const credential = storedToken.credential;
    if (!credential) {
      throw new InvalidRefreshTokenException();
    }

    await this.refreshTokenRepository.revokeToken(
      storedToken.id,
      'Rotated on refresh',
    );

    const tokens = await this.generateTokenPair(
      credential,
      storedToken.sessionId,
      payload.roles,
      payload.permissions,
      deviceInfo,
    );

    await this.eventPublisher.publishTokenRefreshed(
      {
        userId: credential.userId,
        sessionId: storedToken.sessionId,
      },
      correlationId,
    );

    return tokens;
  }

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    const tokenHash = this.passwordService.hashToken(refreshToken);
    const storedToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

    if (storedToken) {
      await this.refreshTokenRepository.revokeToken(storedToken.id, 'User logout');
      await this.redisService.del(CACHE_KEYS.REFRESH_TOKEN(tokenHash));
    }
  }

  generateMfaToken(userId: string, sessionId: string): string {
    return this.jwtService.sign(
      { sub: userId, sessionId, type: 'mfa' },
      {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: '5m',
      },
    );
  }

  verifyMfaToken(mfaToken: string): { sub: string; sessionId: string } {
    const payload = this.jwtService.verify(mfaToken, {
      secret: this.configService.get<string>('jwt.accessSecret'),
    });

    if (payload.type !== 'mfa') {
      throw new InvalidRefreshTokenException();
    }

    return { sub: payload.sub, sessionId: payload.sessionId };
  }

  private parseExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 900000;

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
        return 900000;
    }
  }
}
