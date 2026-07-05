import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PersonnelRecord } from '../../../database/entities/personnel-record.entity';
import { ServiceStatus, PersonnelType, ServiceBranch } from '../../../common/enums';

@Injectable()
export class PersonnelRecordRepository {
  constructor(@InjectRepository(PersonnelRecord) private readonly repo: Repository<PersonnelRecord>) {}

  create(data: Partial<PersonnelRecord>): Promise<PersonnelRecord> {
    return this.repo.save(this.repo.create(data));
  }

  update(id: string, data: Partial<PersonnelRecord>): Promise<void> {
    return this.repo.update(id, data as Record<string, unknown>).then(() => undefined);
  }

  findById(id: string): Promise<PersonnelRecord | null> {
    return this.repo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['rankHistory', 'rankHistory.rank', 'assignments', 'assignments.unit', 'qualifications', 'qualifications.qualification'],
    });
  }

  findByUserId(userId: string): Promise<PersonnelRecord | null> {
    return this.repo.findOne({ where: { userId, deletedAt: IsNull() } });
  }

  findByServiceNumber(serviceNumber: string): Promise<PersonnelRecord | null> {
    return this.repo.findOne({ where: { serviceNumber, deletedAt: IsNull() } });
  }

  async findAll(page: number, limit: number, search?: string, serviceStatus?: ServiceStatus, personnelType?: PersonnelType, branch?: ServiceBranch) {
    const qb = this.repo.createQueryBuilder('p').where('p.deletedAt IS NULL');
    if (search) qb.andWhere('(p.firstName ILIKE :s OR p.lastName ILIKE :s OR p.serviceNumber ILIKE :s OR p.email ILIKE :s)', { s: `%${search}%` });
    if (serviceStatus) qb.andWhere('p.serviceStatus = :serviceStatus', { serviceStatus });
    if (personnelType) qb.andWhere('p.personnelType = :personnelType', { personnelType });
    if (branch) qb.andWhere('p.branch = :branch', { branch });
    const [data, total] = await qb.orderBy('p.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  softDelete(id: string): Promise<void> {
    return this.repo.softDelete(id).then(() => undefined);
  }
}
