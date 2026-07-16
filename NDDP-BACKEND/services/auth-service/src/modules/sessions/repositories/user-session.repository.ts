import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, In } from 'typeorm';
import { UserSession } from '../../../database/entities/user-session.entity';
import { SessionStatus } from '../../../common/enums';
import { PaginatedResult } from '../../../common/interfaces';

@Injectable()
export class UserSessionRepository {
  constructor(
    @InjectRepository(UserSession)
    private readonly repository: Repository<UserSession>,
  ) {}

  async create(data: Partial<UserSession>): Promise<UserSession> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<UserSession | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findActiveByCredentialId(credentialId: string): Promise<UserSession[]> {
    return this.repository.find({
      where: { credentialId, status: SessionStatus.ACTIVE },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCredentialIdPaginated(
    credentialId: string,
    page: number,
    limit: number,
    status?: SessionStatus,
  ): Promise<PaginatedResult<UserSession>> {
    const where: Record<string, unknown> = { credentialId };
    if (status) where.status = status;

    const [data, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async updateLastActivity(id: string): Promise<void> {
    await this.repository.update(id, { lastActivityAt: new Date() });
  }

  async revokeSession(id: string, reason: string): Promise<void> {
    await this.repository.update(id, {
      status: SessionStatus.REVOKED,
      revokedAt: new Date(),
      revokedReason: reason,
    });
  }

  async revokeAllByCredentialId(credentialId: string, reason: string): Promise<void> {
    await this.repository.update(
      { credentialId, status: SessionStatus.ACTIVE },
      {
        status: SessionStatus.REVOKED,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    );
  }

  async revokeAllExcept(credentialId: string, exceptSessionId: string, reason: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(UserSession)
      .set({
        status: SessionStatus.REVOKED,
        revokedAt: new Date(),
        revokedReason: reason,
      })
      .where('credential_id = :credentialId', { credentialId })
      .andWhere('status = :status', { status: SessionStatus.ACTIVE })
      .andWhere('id != :exceptSessionId', { exceptSessionId })
      .execute();
  }

  async expireOldSessions(): Promise<number> {
    const result = await this.repository.update(
      {
        status: SessionStatus.ACTIVE,
        expiresAt: LessThan(new Date()),
      },
      { status: SessionStatus.EXPIRED },
    );
    return result.affected || 0;
  }

  async markMfaVerified(id: string): Promise<void> {
    await this.repository.update(id, { mfaVerified: true });
  }
}
