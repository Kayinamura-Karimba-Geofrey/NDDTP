import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from '../../../database/entities/interview.entity';

@Injectable()
export class InterviewRepository {
  constructor(@InjectRepository(Interview) private readonly repo: Repository<Interview>) {}
  create(data: Partial<Interview>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Interview>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['application', 'application.candidate'] }); }
  findByApplication(applicationId: string) {
    return this.repo.find({ where: { applicationId }, order: { scheduledAt: 'DESC' } });
  }
}
