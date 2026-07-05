import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WelfareClaim } from '../../../database/entities/welfare-claim.entity';
import { ClaimStatusHistory } from '../../../database/entities/claim-status-history.entity';
import { Disbursement } from '../../../database/entities/disbursement.entity';
import { ClaimStatus } from '../../../common/enums';

@Injectable()
export class ClaimRepository {
  constructor(@InjectRepository(WelfareClaim) private readonly repo: Repository<WelfareClaim>) {}
  create(data: Partial<WelfareClaim>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<WelfareClaim>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['program', 'dependent', 'statusHistory', 'disbursement'],
    });
  }

  async findAll(page: number, limit: number, status?: ClaimStatus, userId?: string, programId?: string) {
    const qb = this.repo.createQueryBuilder('c')
      .leftJoinAndSelect('c.program', 'program')
      .leftJoinAndSelect('c.dependent', 'dependent');
    if (status) qb.andWhere('c.status = :status', { status });
    if (userId) qb.andWhere('c.userId = :userId', { userId });
    if (programId) qb.andWhere('c.programId = :programId', { programId });
    const [data, total] = await qb.orderBy('c.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPendingReview(page: number, limit: number) {
    return this.repo.findAndCount({
      where: [{ status: ClaimStatus.SUBMITTED }, { status: ClaimStatus.UNDER_REVIEW }],
      relations: ['program', 'dependent'],
      order: { submittedAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

@Injectable()
export class ClaimStatusHistoryRepository {
  constructor(@InjectRepository(ClaimStatusHistory) private readonly repo: Repository<ClaimStatusHistory>) {}
  create(data: Partial<ClaimStatusHistory>) { return this.repo.save(this.repo.create(data)); }
}

@Injectable()
export class DisbursementRepository {
  constructor(@InjectRepository(Disbursement) private readonly repo: Repository<Disbursement>) {}
  create(data: Partial<Disbursement>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Disbursement>) { return this.repo.update(id, data as Record<string, unknown>); }
  findByClaimId(claimId: string) { return this.repo.findOne({ where: { claimId } }); }
}
