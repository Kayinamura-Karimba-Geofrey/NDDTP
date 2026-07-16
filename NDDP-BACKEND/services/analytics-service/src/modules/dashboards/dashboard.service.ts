import { Injectable, Logger } from '@nestjs/common';
import { DashboardRepository } from './repositories/dashboard.repository';
import { MetricDefinitionRepository } from '../metrics/repositories/metric.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateDashboardDto, UpdateDashboardStatusDto } from './dto/dashboard.dto';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/analytics.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { DashboardStatus } from '../../common/enums';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly repo: DashboardRepository,
    private readonly metricRepo: MetricDefinitionRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateDashboardDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    if (dto.widgets?.length) {
      for (const w of dto.widgets) {
        const metric = await this.metricRepo.findById(w.metricId);
        if (!metric) throw new ResourceNotFoundException('MetricDefinition', w.metricId);
      }
    }

    const dashboard = await this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description ?? null,
      createdBy,
      status: DashboardStatus.DRAFT,
      widgets: dto.widgets ?? [],
    });

    await this.publisher.publishDashboardCreated({ dashboardId: dashboard.id, code: dashboard.code, createdBy });
    this.logger.log(`Dashboard created: ${dashboard.code}`);
    return dashboard;
  }

  findActive() { return this.repo.findActive(); }
  findMine(userId: string) { return this.repo.findByCreator(userId); }

  async findById(id: string) {
    const dashboard = await this.repo.findById(id);
    if (!dashboard) throw new ResourceNotFoundException('Dashboard', id);
    return dashboard;
  }

  async activate(id: string, userId: string, isStaff = false) {
    const dashboard = await this.findById(id);
    if (!isStaff && dashboard.createdBy !== userId) {
      throw new BusinessRuleViolationException('You can only activate your own dashboards');
    }
    if (dashboard.status === DashboardStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Dashboard is already active');
    }
    await this.repo.update(id, { status: DashboardStatus.ACTIVE });
    await this.redis.del(CACHE_KEYS.DASHBOARD(id));
    return this.repo.findById(id);
  }

  async updateStatus(id: string, dto: UpdateDashboardStatusDto) {
    await this.findById(id);
    await this.repo.update(id, { status: dto.status });
    await this.redis.del(CACHE_KEYS.DASHBOARD(id));
    return this.repo.findById(id);
  }
}
