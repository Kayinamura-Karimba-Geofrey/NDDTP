import { Injectable, Logger } from '@nestjs/common';
import { BiDatasetRepository } from './repositories/dataset.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateBiDatasetDto } from './dto/dataset.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/bi.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { DatasetStatus } from '../../common/enums';

@Injectable()
export class BiDatasetService {
  private readonly logger = new Logger(BiDatasetService.name);

  constructor(
    private readonly repo: BiDatasetRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateBiDatasetDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const dataset = await this.repo.create({
      code: dto.code,
      name: dto.name,
      sourceType: dto.sourceType,
      schema: dto.schema ?? null,
      description: dto.description ?? null,
      status: DatasetStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.DATASETS);
    await this.publisher.publishDatasetCreated({ datasetId: dataset.id, code: dataset.code });
    this.logger.log(`BI dataset created: ${dataset.code}`);
    return dataset;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.DATASETS);
    if (cached) return JSON.parse(cached);
    const datasets = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.DATASETS, JSON.stringify(datasets), 600);
    return datasets;
  }

  async findById(id: string) {
    const dataset = await this.repo.findById(id);
    if (!dataset) throw new ResourceNotFoundException('BiDataset', id);
    return dataset;
  }
}
