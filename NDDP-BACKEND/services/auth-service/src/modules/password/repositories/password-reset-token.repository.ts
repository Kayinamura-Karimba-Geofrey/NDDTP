import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { PasswordResetToken } from '../../../database/entities/password-reset-token.entity';

@Injectable()
export class PasswordResetTokenRepository {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly repository: Repository<PasswordResetToken>,
  ) {}

  async create(data: Partial<PasswordResetToken>): Promise<PasswordResetToken> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findValidByTokenHash(tokenHash: string): Promise<PasswordResetToken | null> {
    return this.repository.findOne({
      where: {
        tokenHash,
        isUsed: false,
      },
      relations: ['credential'],
    });
  }

  async markAsUsed(id: string): Promise<void> {
    await this.repository.update(id, {
      isUsed: true,
      usedAt: new Date(),
    });
  }

  async invalidateAllByCredentialId(credentialId: string): Promise<void> {
    await this.repository.update(
      { credentialId, isUsed: false },
      { isUsed: true, usedAt: new Date() },
    );
  }

  async deleteExpired(): Promise<number> {
    const result = await this.repository.delete({
      expiresAt: LessThan(new Date()),
    });
    return result.affected || 0;
  }
}
