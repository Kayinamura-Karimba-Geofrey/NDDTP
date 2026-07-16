import { Injectable, Logger } from '@nestjs/common';
import { SearchIndexRepository } from './repositories/search-index.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateSearchIndexDto } from './dto/search-index.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/search.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { IndexStatus } from '../../common/enums';

@Injectable()
export class SearchIndexService {
  private readonly logger = new Logger(SearchIndexService.name);

  constructor(
    private readonly repo: SearchIndexRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateSearchIndexDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const index = await this.repo.create({
      code: dto.code,
      name: dto.name,
      indexType: dto.indexType,
      description: dto.description ?? null,
      status: IndexStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.INDEXES);
    await this.publisher.publishIndexCreated({ indexId: index.id, code: index.code });
    this.logger.log(`Search index created: ${index.code}`);
    return index;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.INDEXES);
    if (cached) return JSON.parse(cached);
    const indexes = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.INDEXES, JSON.stringify(indexes), 600);
    return indexes;
  }

  async findById(id: string) {
    const index = await this.repo.findById(id);
    if (!index) throw new ResourceNotFoundException('SearchIndex', id);
    return index;
  }
}
