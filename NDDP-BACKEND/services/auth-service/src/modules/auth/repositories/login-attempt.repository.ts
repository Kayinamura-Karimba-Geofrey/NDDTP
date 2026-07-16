import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAttempt } from '../../../database/entities/login-attempt.entity';
import { LoginAttemptResult } from '../../../common/enums';
import { PaginatedResult } from '../../../common/interfaces';

@Injectable()
export class LoginAttemptRepository {
  constructor(
    @InjectRepository(LoginAttempt)
    private readonly repository: Repository<LoginAttempt>,
  ) {}

  async create(data: Partial<LoginAttempt>): Promise<LoginAttempt> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findByCredentialIdPaginated(
    credentialId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<LoginAttempt>> {
    const [data, total] = await this.repository.findAndCount({
      where: { credentialId },
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

  async countRecentFailedAttempts(email: string, since: Date): Promise<number> {
    return this.repository.count({
      where: {
        email: email.toLowerCase(),
        result: LoginAttemptResult.FAILED_INVALID_CREDENTIALS,
        createdAt: Repository.prototype.manager
          ? undefined
          : undefined,
      },
    });
  }

  async countFailedByEmailSince(email: string, since: Date): Promise<number> {
    return this.repository
      .createQueryBuilder('attempt')
      .where('attempt.email = :email', { email: email.toLowerCase() })
      .andWhere('attempt.result IN (:...results)', {
        results: [
          LoginAttemptResult.FAILED_INVALID_CREDENTIALS,
          LoginAttemptResult.FAILED_MFA_INVALID,
        ],
      })
      .andWhere('attempt.created_at >= :since', { since })
      .getCount();
  }
}
