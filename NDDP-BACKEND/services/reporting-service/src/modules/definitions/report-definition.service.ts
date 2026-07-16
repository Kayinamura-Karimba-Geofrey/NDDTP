import { Injectable, Logger } from '@nestjs/common';
import { ReportDefinitionRepository } from './repositories/report-definition.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateReportDefinitionDto } from './dto/report-definition.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/reporting.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { DefinitionStatus, OutputFormat } from '../../common/enums';

@Injectable()
export class ReportDefinitionService {
  private readonly logger = new Logger(ReportDefinitionService.name);

  constructor(
    private readonly repo: ReportDefinitionRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateReportDefinitionDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const definition = await this.repo.create({
      code: dto.code,
      name: dto.name,
      reportType: dto.reportType,
      category: dto.category,
      outputFormat: dto.outputFormat ?? OutputFormat.PDF,
      description: dto.description ?? null,
      status: DefinitionStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.DEFINITIONS);
    await this.publisher.publishDefinitionCreated({ definitionId: definition.id, code: definition.code });
    this.logger.log(`Report definition created: ${definition.code}`);
    return definition;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.DEFINITIONS);
    if (cached) return JSON.parse(cached);
    const definitions = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.DEFINITIONS, JSON.stringify(definitions), 600);
    return definitions;
  }

  async findById(id: string) {
    const definition = await this.repo.findById(id);
    if (!definition) throw new ResourceNotFoundException('ReportDefinition', id);
    return definition;
  }
}
