import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { JobPosting } from '../../../database/entities/job-posting.entity';
import { JobPostingStatus } from '../../../common/enums';

@Injectable()
export class JobPostingRepository {
  constructor(@InjectRepository(JobPosting) private readonly repo: Repository<JobPosting>) {}

  create(data: Partial<JobPosting>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<JobPosting>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id, deletedAt: IsNull() } }); }
  findByReference(ref: string) { return this.repo.findOne({ where: { referenceNumber: ref, deletedAt: IsNull() } }); }

  async findAll(page: number, limit: number, status?: JobPostingStatus, department?: string, search?: string) {
    const qb = this.repo.createQueryBuilder('jp').where('jp.deletedAt IS NULL');
    if (status) qb.andWhere('jp.status = :status', { status });
    if (department) qb.andWhere('jp.department = :department', { department });
    if (search) qb.andWhere('(jp.title ILIKE :s OR jp.referenceNumber ILIKE :s)', { s: `%${search}%` });
    const [data, total] = await qb.orderBy('jp.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPublished() {
    return this.repo.find({
      where: { status: JobPostingStatus.PUBLISHED, deletedAt: IsNull() },
      order: { publishedAt: 'DESC' },
    });
  }
}
