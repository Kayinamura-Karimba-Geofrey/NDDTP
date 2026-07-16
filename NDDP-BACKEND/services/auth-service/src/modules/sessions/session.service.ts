import { Injectable } from '@nestjs/common';
import { UserSessionRepository } from './repositories/user-session.repository';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { SessionFilterDto } from '../auth/dto/auth-filter.dto';
import { ResourceNotFoundException } from '../../common/exceptions/auth.exceptions';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: UserSessionRepository,
    private readonly credentialRepository: AuthCredentialRepository,
    private readonly eventPublisher: EventPublisherService,
    private readonly redisService: RedisService,
  ) {}

  async getUserSessions(userId: string, filter: SessionFilterDto, currentSessionId: string) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    const result = await this.sessionRepository.findByCredentialIdPaginated(
      credential.id,
      filter.page || 1,
      filter.limit || 20,
      filter.status,
    );

    return {
      data: result.data.map((session) => ({
        id: session.id,
        deviceName: session.deviceName,
        platform: session.platform,
        ipAddress: session.ipAddress,
        status: session.status,
        mfaVerified: session.mfaVerified,
        createdAt: session.createdAt,
        lastActivityAt: session.lastActivityAt,
        isCurrent: session.id === currentSessionId,
      })),
      meta: result.meta,
    };
  }

  async revokeSession(userId: string, sessionId: string, correlationId?: string) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    const session = await this.sessionRepository.findById(sessionId);
    if (!session || session.credentialId !== credential.id) {
      throw new ResourceNotFoundException('Session', sessionId);
    }

    await this.sessionRepository.revokeSession(sessionId, 'Revoked by user');

    await this.redisService.del(CACHE_KEYS.USER_SESSION(sessionId));

    await this.eventPublisher.publishSessionRevoked(
      { userId, sessionId, reason: 'user_revoked' },
      correlationId,
    );

    return { message: 'Session revoked successfully' };
  }

  async revokeAllSessions(userId: string, currentSessionId: string, correlationId?: string) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    await this.sessionRepository.revokeAllExcept(
      credential.id,
      currentSessionId,
      'Revoked all other sessions',
    );

    await this.eventPublisher.publishSessionRevoked(
      { userId, reason: 'revoked_all_except_current' },
      correlationId,
    );

    return { message: 'All other sessions revoked successfully' };
  }
}
