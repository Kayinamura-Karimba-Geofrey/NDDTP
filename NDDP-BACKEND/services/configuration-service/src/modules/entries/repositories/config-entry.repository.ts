import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigEntry } from '../../../database/entities/config-entry.entity';
import { EntryStatus } from '../../../common/enums';

@Injectable()
export class ConfigEntryRepository {
  constructor(@InjectRepository(ConfigEntry) private readonly repo: Repository<ConfigEntry>) {}

  create(data: Partial<ConfigEntry>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['namespace'] }); }
  findByNamespaceAndKey(namespaceId: string, key: string) {
    return this.repo.findOne({ where: { namespaceId, key } });
  }
  update(id: string, data: Partial<ConfigEntry>) { return this.repo.update(id, data as Record<string, unknown>); }

  findActiveByNamespace(namespaceId: string) {
    return this.repo.find({
      where: { namespaceId, status: EntryStatus.ACTIVE },
      order: { key: 'ASC' },
    });
  }

  findByNamespace(namespaceId: string) {
    return this.repo.find({ where: { namespaceId }, order: { key: 'ASC' } });
  }
}
