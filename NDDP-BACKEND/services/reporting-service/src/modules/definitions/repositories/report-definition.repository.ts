import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportDefinition } from '../../../database/entities/report-definition.entity';
import { DefinitionStatus } from '../../../common/enums';

@Injectable()
export class ReportDefinitionRepository {
  constructor(@InjectRepository(ReportDefinition) private readonly repo: Repository<ReportDefinition>) {}

  create(data: Partial<ReportDefinition>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: DefinitionStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
