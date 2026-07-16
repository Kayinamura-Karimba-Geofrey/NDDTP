import { Injectable, Logger } from '@nestjs/common';
import { MetricDefinitionRepository, MetricSnapshotRepository } from './repositories/metric.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateMetricDefinitionDto, RecordMetricSnapshotDto } from './dto/metric.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/analytics.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { MetricStatus } from '../../common/enums';

@Injectable()
export class MetricService {
  private readonly logger = new Logger(MetricService.name);

  constructor(
    private readonly defRepo: MetricDefinitionRepository,
    private readonly snapshotRepo: MetricSnapshotRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async createDefinition(dto: CreateMetricDefinitionDto) {
    const existing = await this.defRepo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const metric = await this.defRepo.create({
      code: dto.code,
      name: dto.name,
      domain: dto.domain,
      aggregationType: dto.aggregationType,
      unit: dto.unit ?? null,
      description: dto.description ?? null,
      status: MetricStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.METRICS);
    await this.publisher.publishMetricCreated({ metricId: metric.id, code: metric.code });
    this.logger.log(`Metric definition created: ${metric.code}`);
    return metric;
  }

  async findActiveDefinitions() {
    const cached = await this.redis.get(CACHE_KEYS.METRICS);
    if (cached) return JSON.parse(cached);
    const metrics = await this.defRepo.findActive();
    await this.redis.set(CACHE_KEYS.METRICS, JSON.stringify(metrics), 600);
    return metrics;
  }

  async findDefinitionById(id: string) {
    const metric = await this.defRepo.findById(id);
    if (!metric) throw new ResourceNotFoundException('MetricDefinition', id);
    return metric;
  }

  async recordSnapshot(metricId: string, dto: RecordMetricSnapshotDto) {
    const metric = await this.findDefinitionById(metricId);
    if (metric.status !== MetricStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Metric definition is not active');
    }

    const periodStart = new Date(dto.periodStart);
    const periodEnd = new Date(dto.periodEnd);
    if (periodEnd <= periodStart) {
      throw new BusinessRuleViolationException('Period end must be after period start');
    }

    const snapshot = await this.snapshotRepo.create({
      metricId,
      periodStart,
      periodEnd,
      value: dto.value,
      dimensions: dto.dimensions ?? null,
      recordedAt: new Date(),
    });

    await this.publisher.publishSnapshotRecorded({
      snapshotId: snapshot.id, metricId, code: metric.code, value: dto.value,
    });
    return snapshot;
  }

  async findSnapshots(metricId: string, from?: string, to?: string) {
    await this.findDefinitionById(metricId);
    return this.snapshotRepo.findByMetricId(
      metricId,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }
}
