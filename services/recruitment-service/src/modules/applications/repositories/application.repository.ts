import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from '../../../database/entities/candidate.entity';
import { Application } from '../../../database/entities/application.entity';
import { ApplicationStatusHistory } from '../../../database/entities/application-status-history.entity';
import { ApplicationStatus } from '../../../common/enums';

@Injectable()
export class CandidateRepository {
  constructor(@InjectRepository(Candidate) private readonly repo: Repository<Candidate>) {}
  create(data: Partial<Candidate>) { return this.repo.save(this.repo.create(data)); }
  findByEmail(email: string) { return this.repo.findOne({ where: { email: email.toLowerCase() } }); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  update(id: string, data: Partial<Candidate>) { return this.repo.update(id, data as Record<string, unknown>); }
}

@Injectable()
export class ApplicationRepository {
  constructor(@InjectRepository(Application) private readonly repo: Repository<Application>) {}
  create(data: Partial<Application>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Application>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['candidate', 'jobPosting', 'statusHistory', 'interviews'],
    });
  }

  findByPostingAndCandidate(postingId: string, candidateId: string) {
    return this.repo.findOne({ where: { jobPostingId: postingId, candidateId } });
  }

  async findAll(page: number, limit: number, status?: ApplicationStatus, jobPostingId?: string, candidateId?: string) {
    const qb = this.repo.createQueryBuilder('a')
      .leftJoinAndSelect('a.candidate', 'candidate')
      .leftJoinAndSelect('a.jobPosting', 'jobPosting');
    if (status) qb.andWhere('a.status = :status', { status });
    if (jobPostingId) qb.andWhere('a.jobPostingId = :jobPostingId', { jobPostingId });
    if (candidateId) qb.andWhere('a.candidateId = :candidateId', { candidateId });
    const [data, total] = await qb.orderBy('a.submittedAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  countByStatus() {
    return this.repo.createQueryBuilder('a')
      .select('a.status', 'status').addSelect('COUNT(*)', 'count')
      .groupBy('a.status').getRawMany();
  }
}

@Injectable()
export class ApplicationStatusHistoryRepository {
  constructor(@InjectRepository(ApplicationStatusHistory) private readonly repo: Repository<ApplicationStatusHistory>) {}
  create(data: Partial<ApplicationStatusHistory>) { return this.repo.save(this.repo.create(data)); }
}
