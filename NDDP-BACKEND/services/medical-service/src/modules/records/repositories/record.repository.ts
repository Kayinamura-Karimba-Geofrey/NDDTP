import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../../../database/entities/medical-record.entity';
import { RecordType } from '../../../common/enums';

@Injectable()
export class RecordRepository {
  constructor(@InjectRepository(MedicalRecord) private readonly repo: Repository<MedicalRecord>) {}

  create(data: Partial<MedicalRecord>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }

  async findAll(page: number, limit: number, userId?: string, recordType?: RecordType) {
    const qb = this.repo.createQueryBuilder('r');
    if (userId) qb.andWhere('r.userId = :userId', { userId });
    if (recordType) qb.andWhere('r.recordType = :recordType', { recordType });
    const [data, total] = await qb.orderBy('r.recordedAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
