import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingCertification } from '../../../database/entities/training-certification.entity';
import { CertificationStatus } from '../../../common/enums';

@Injectable()
export class CertificationRepository {
  constructor(@InjectRepository(TrainingCertification) private readonly repo: Repository<TrainingCertification>) {}

  create(data: Partial<TrainingCertification>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<TrainingCertification>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }

  async findAll(page: number, limit: number, userId?: string, status?: CertificationStatus) {
    const qb = this.repo.createQueryBuilder('c');
    if (userId) qb.andWhere('c.userId = :userId', { userId });
    if (status) qb.andWhere('c.status = :status', { status });
    const [data, total] = await qb.orderBy('c.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
