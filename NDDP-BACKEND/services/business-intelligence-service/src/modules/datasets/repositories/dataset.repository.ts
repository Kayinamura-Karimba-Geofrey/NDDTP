import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BiDataset } from '../../../database/entities/bi-dataset.entity';
import { DatasetStatus } from '../../../common/enums';

@Injectable()
export class BiDatasetRepository {
  constructor(@InjectRepository(BiDataset) private readonly repo: Repository<BiDataset>) {}

  create(data: Partial<BiDataset>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: DatasetStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
