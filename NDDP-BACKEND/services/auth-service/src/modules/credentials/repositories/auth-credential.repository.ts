import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { AuthCredential } from '../../../database/entities/auth-credential.entity';
import { AccountStatus } from '../../../common/enums';

@Injectable()
export class AuthCredentialRepository {
  constructor(
    @InjectRepository(AuthCredential)
    private readonly repository: Repository<AuthCredential>,
  ) {}

  async create(data: Partial<AuthCredential>): Promise<AuthCredential> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<AuthCredential | null> {
    return this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['mfaSetting'],
    });
  }

  async findByEmail(email: string): Promise<AuthCredential | null> {
    return this.repository.findOne({
      where: { email: email.toLowerCase(), deletedAt: IsNull() },
      relations: ['mfaSetting'],
    });
  }

  async findByUserId(userId: string): Promise<AuthCredential | null> {
    return this.repository.findOne({
      where: { userId, deletedAt: IsNull() },
      relations: ['mfaSetting'],
    });
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await this.repository.update(id, {
      passwordHash,
      lastPasswordChangeAt: new Date(),
      mustChangePassword: false,
    });
  }

  async updateStatus(id: string, status: AccountStatus): Promise<void> {
    await this.repository.update(id, { status });
  }

  async updateEmail(id: string, email: string): Promise<void> {
    await this.repository.update(id, { email: email.toLowerCase() });
  }

  async incrementFailedAttempts(id: string): Promise<void> {
    await this.repository.increment({ id }, 'failedLoginAttempts', 1);
  }

  async resetFailedAttempts(id: string): Promise<void> {
    await this.repository.update(id, {
      failedLoginAttempts: 0,
      lockedUntil: null,
    });
  }

  async lockAccount(id: string, lockedUntil: Date): Promise<void> {
    await this.repository.update(id, {
      status: AccountStatus.LOCKED,
      lockedUntil,
    });
  }

  async unlockAccount(id: string): Promise<void> {
    await this.repository.update(id, {
      status: AccountStatus.ACTIVE,
      lockedUntil: null,
      failedLoginAttempts: 0,
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.repository.update(id, { lastLoginAt: new Date() });
  }

  async verifyEmail(id: string): Promise<void> {
    await this.repository.update(id, {
      emailVerified: true,
      emailVerifiedAt: new Date(),
      status: AccountStatus.ACTIVE,
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
