import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchIndex } from '../../../database/entities/search-index.entity';
import { IndexStatus } from '../../../common/enums';

@Injectable()
export class SearchIndexRepository {
  constructor(@InjectRepository(SearchIndex) private readonly repo: Repository<SearchIndex>) {}

  create(data: Partial<SearchIndex>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: IndexStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
