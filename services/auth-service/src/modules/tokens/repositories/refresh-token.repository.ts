import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { RefreshToken } from '../../../database/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>,
  ) {}

  async create(data: Partial<RefreshToken>): Promise<RefreshToken> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return this.repository.findOne({
      where: { tokenHash, isRevoked: false },
      relations: ['credential'],
    });
  }

  async findById(id: string): Promise<RefreshToken | null> {
    return this.repository.findOne({ where: { id } });
  }

  async revokeToken(id: string, reason: string, replacedByTokenId?: string): Promise<void> {
    await this.repository.update(id, {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason,
      replacedByTokenId: replacedByTokenId || null,
    });
  }

  async revokeAllByCredentialId(credentialId: string, reason: string): Promise<void> {
    await this.repository.update(
      { credentialId, isRevoked: false },
      {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    );
  }

  async revokeFamily(familyId: string, reason: string): Promise<void> {
    await this.repository.update(
      { familyId, isRevoked: false },
      {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    );
  }

  async revokeBySessionId(sessionId: string, reason: string): Promise<void> {
    await this.repository.update(
      { sessionId, isRevoked: false },
      {
        isRevoked: true,
        revokedAt: new Date(),
        revokedReason: reason,
      },
    );
  }

  async deleteExpired(): Promise<number> {
    const result = await this.repository.delete({
      expiresAt: LessThan(new Date()),
      isRevoked: true,
    });
    return result.affected || 0;
  }
}
