import { Injectable } from '@nestjs/common';
import { ConfigRevisionRepository } from './repositories/config-revision.repository';
import { ConfigEntryRepository } from '../entries/repositories/config-entry.repository';
import { ResourceNotFoundException } from '../../common/exceptions/configuration.exceptions';

@Injectable()
export class RevisionService {
  constructor(
    private readonly repo: ConfigRevisionRepository,
    private readonly entryRepo: ConfigEntryRepository,
  ) {}

  async findByEntry(entryId: string) {
    const entry = await this.entryRepo.findById(entryId);
    if (!entry) throw new ResourceNotFoundException('ConfigEntry', entryId);
    return this.repo.findByEntryId(entryId);
  }
}
