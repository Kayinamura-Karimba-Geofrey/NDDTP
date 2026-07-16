import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationJobLog } from '../../../database/entities/integration-job-log.entity';

@Injectable()
export class JobLogRepository {
  constructor(@InjectRepository(IntegrationJobLog) private readonly repo: Repository<IntegrationJobLog>) {}

  create(data: Partial<IntegrationJobLog>) { return this.repo.save(this.repo.create(data)); }

  findByJobId(jobId: string) {
    return this.repo.find({ where: { jobId }, order: { createdAt: 'ASC' } });
  }
}
