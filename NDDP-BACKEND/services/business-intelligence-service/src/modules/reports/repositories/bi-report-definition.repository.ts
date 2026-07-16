import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BiReportDefinition } from '../../../database/entities/bi-report-definition.entity';
import { ReportDefinitionStatus } from '../../../common/enums';

@Injectable()
export class BiReportDefinitionRepository {
  constructor(@InjectRepository(BiReportDefinition) private readonly repo: Repository<BiReportDefinition>) {}

  create(data: Partial<BiReportDefinition>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['model', 'model.dataset'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: ReportDefinitionStatus.ACTIVE }, relations: ['model'], order: { name: 'ASC' } }); }
}
