import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleAssignment } from '../../../database/entities/user-role-assignment.entity';
import { AssignmentStatus, ScopeType } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class UserRoleAssignmentRepository {
  constructor(@InjectRepository(UserRoleAssignment) private readonly repo: Repository<UserRoleAssignment>) {}

  create(data: Partial<UserRoleAssignment>): Promise<UserRoleAssignment> {
    return this.repo.save(this.repo.create(data));
  }

  findById(id: string): Promise<UserRoleAssignment | null> {
    return this.repo.findOne({ where: { id }, relations: ['role'] });
  }

  async findActiveByUserId(userId: string, scopeType?: ScopeType, scopeId?: string): Promise<UserRoleAssignment[]> {
    const qb = this.repo.createQueryBuilder('a')
      .innerJoinAndSelect('a.role', 'role')
      .where('a.user_id = :userId', { userId })
      .andWhere('a.status = :status', { status: AssignmentStatus.ACTIVE })
      .andWhere('role.status = :roleStatus', { roleStatus: 'ACTIVE' })
      .andWhere('role.deleted_at IS NULL')
      .andWhere('(a.expires_at IS NULL OR a.expires_at > :now)', { now: new Date() });

    if (scopeType) qb.andWhere('(a.scope_type = :scopeType OR a.scope_type = :global)', { scopeType, global: ScopeType.GLOBAL });
    if (scopeId) qb.andWhere('(a.scope_id = :scopeId OR a.scope_id IS NULL)', { scopeId });

    return qb.getMany();
  }

  async findByUserIdPaginated(userId: string, page: number, limit: number): Promise<PaginatedResult<UserRoleAssignment>> {
    const [data, total] = await this.repo.findAndCount({
      where: { userId },
      relations: ['role'],
      order: { assignedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findExisting(userId: string, roleId: string, scopeType: ScopeType, scopeId?: string): Promise<UserRoleAssignment | null> {
    const qb = this.repo.createQueryBuilder('a')
      .where('a.user_id = :userId', { userId })
      .andWhere('a.role_id = :roleId', { roleId })
      .andWhere('a.scope_type = :scopeType', { scopeType })
      .andWhere('a.status = :status', { status: AssignmentStatus.ACTIVE });

    if (scopeId) qb.andWhere('a.scope_id = :scopeId', { scopeId });
    else qb.andWhere('a.scope_id IS NULL');

    return qb.getOne();
  }

  async revoke(id: string, revokedBy: string, reason: string): Promise<void> {
    await this.repo.update(id, {
      status: AssignmentStatus.REVOKED,
      revokedBy,
      revokedAt: new Date(),
      revokeReason: reason,
    });
  }

  async revokeAllByUserId(userId: string, revokedBy: string, reason: string): Promise<void> {
    await this.repo.update(
      { userId, status: AssignmentStatus.ACTIVE },
      { status: AssignmentStatus.REVOKED, revokedBy, revokedAt: new Date(), revokeReason: reason },
    );
  }
}
