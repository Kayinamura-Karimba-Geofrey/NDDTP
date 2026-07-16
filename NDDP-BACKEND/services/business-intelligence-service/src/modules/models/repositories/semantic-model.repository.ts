import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemanticModel } from '../../../database/entities/semantic-model.entity';
import { ModelStatus } from '../../../common/enums';

@Injectable()
export class SemanticModelRepository {
  constructor(@InjectRepository(SemanticModel) private readonly repo: Repository<SemanticModel>) {}

  create(data: Partial<SemanticModel>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['dataset'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: ModelStatus.ACTIVE }, relations: ['dataset'], order: { name: 'ASC' } }); }
  findByDatasetId(datasetId: string) { return this.repo.find({ where: { datasetId }, order: { name: 'ASC' } }); }
  update(id: string, data: Partial<SemanticModel>) { return this.repo.update(id, data as Record<string, unknown>); }
}
