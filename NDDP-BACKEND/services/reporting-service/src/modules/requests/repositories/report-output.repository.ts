import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportOutput } from '../../../database/entities/report-output.entity';

@Injectable()
export class ReportOutputRepository {
  constructor(@InjectRepository(ReportOutput) private readonly repo: Repository<ReportOutput>) {}

  create(data: Partial<ReportOutput>) { return this.repo.save(this.repo.create(data)); }
  findByRequestId(requestId: string) { return this.repo.find({ where: { requestId }, order: { generatedAt: 'DESC' } }); }
}
