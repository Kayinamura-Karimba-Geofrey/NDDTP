import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from '../../../database/entities/leave-request.entity';
import { LeaveApproval } from '../../../database/entities/leave-approval.entity';
import { LeaveStatusHistory } from '../../../database/entities/leave-status-history.entity';
import { LeaveRequestStatus } from '../../../common/enums';

@Injectable()
export class LeaveRequestRepository {
  constructor(@InjectRepository(LeaveRequest) private readonly repo: Repository<LeaveRequest>) {}

  create(data: Partial<LeaveRequest>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<LeaveRequest>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['leaveType', 'approvals', 'statusHistory'],
    });
  }

  async findAll(page: number, limit: number, status?: LeaveRequestStatus, userId?: string) {
    const qb = this.repo.createQueryBuilder('r').leftJoinAndSelect('r.leaveType', 'leaveType');
    if (status) qb.andWhere('r.status = :status', { status });
    if (userId) qb.andWhere('r.userId = :userId', { userId });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPendingForApprover(approverId: string, page: number, limit: number) {
    return this.repo.findAndCount({
      where: { approverId, status: LeaveRequestStatus.PENDING_APPROVAL },
      relations: ['leaveType'],
      order: { submittedAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

@Injectable()
export class LeaveApprovalRepository {
  constructor(@InjectRepository(LeaveApproval) private readonly repo: Repository<LeaveApproval>) {}
  create(data: Partial<LeaveApproval>) { return this.repo.save(this.repo.create(data)); }
}

@Injectable()
export class LeaveStatusHistoryRepository {
  constructor(@InjectRepository(LeaveStatusHistory) private readonly repo: Repository<LeaveStatusHistory>) {}
  create(data: Partial<LeaveStatusHistory>) { return this.repo.save(this.repo.create(data)); }
}
