import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { MetricDefinition } from '../../../database/entities/metric-definition.entity';
import { MetricSnapshot } from '../../../database/entities/metric-snapshot.entity';
import { MetricStatus } from '../../../common/enums';

@Injectable()
export class MetricDefinitionRepository {
  constructor(@InjectRepository(MetricDefinition) private readonly repo: Repository<MetricDefinition>) {}

  create(data: Partial<MetricDefinition>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: MetricStatus.ACTIVE }, order: { name: 'ASC' } }); }
}

@Injectable()
export class MetricSnapshotRepository {
  constructor(@InjectRepository(MetricSnapshot) private readonly repo: Repository<MetricSnapshot>) {}

  create(data: Partial<MetricSnapshot>) { return this.repo.save(this.repo.create(data)); }

  findByMetricId(metricId: string, from?: Date, to?: Date) {
    const where: Record<string, unknown> = { metricId };
    if (from && to) where.periodStart = Between(from, to);
    else if (from) where.periodStart = MoreThanOrEqual(from);
    else if (to) where.periodStart = LessThanOrEqual(to);
    return this.repo.find({ where, order: { periodStart: 'ASC' } });
  }
}
