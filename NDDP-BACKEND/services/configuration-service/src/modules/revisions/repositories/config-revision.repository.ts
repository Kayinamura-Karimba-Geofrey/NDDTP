import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigRevision } from '../../../database/entities/config-revision.entity';

@Injectable()
export class ConfigRevisionRepository {
  constructor(@InjectRepository(ConfigRevision) private readonly repo: Repository<ConfigRevision>) {}

  create(data: Partial<ConfigRevision>) { return this.repo.save(this.repo.create(data)); }

  findByEntryId(entryId: string) {
    return this.repo.find({ where: { entryId }, order: { version: 'DESC' } });
  }

  async getNextVersion(entryId: string): Promise<number> {
    const latest = await this.repo.findOne({ where: { entryId }, order: { version: 'DESC' } });
    return (latest?.version ?? 0) + 1;
  }
}
