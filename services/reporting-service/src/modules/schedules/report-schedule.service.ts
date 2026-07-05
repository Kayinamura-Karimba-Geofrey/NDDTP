import { Injectable, Logger } from '@nestjs/common';
import { ReportScheduleRepository } from './repositories/report-schedule.repository';
import { ReportDefinitionRepository } from '../definitions/repositories/report-definition.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateScheduleDto } from './dto/report-schedule.dto';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/reporting.exceptions';
import { DefinitionStatus, ScheduleStatus } from '../../common/enums';

@Injectable()
export class ReportScheduleService {
  private readonly logger = new Logger(ReportScheduleService.name);

  constructor(
    private readonly repo: ReportScheduleRepository,
    private readonly defRepo: ReportDefinitionRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateScheduleDto) {
    const definition = await this.defRepo.findById(dto.definitionId);
    if (!definition) throw new ResourceNotFoundException('ReportDefinition', dto.definitionId);
    if (definition.status !== DefinitionStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Report definition is not active');
    }

    const schedule = await this.repo.create({
      definitionId: dto.definitionId,
      cronExpression: dto.cronExpression,
      createdBy,
      status: ScheduleStatus.ACTIVE,
      notes: dto.notes ?? null,
    });

    await this.publisher.publishScheduleCreated({
      scheduleId: schedule.id, definitionId: dto.definitionId, cronExpression: dto.cronExpression,
    });
    this.logger.log(`Report schedule created: ${schedule.id}`);
    return this.repo.findById(schedule.id);
  }

  findActive() {
    return this.repo.findActive();
  }

  async findById(id: string) {
    const schedule = await this.repo.findById(id);
    if (!schedule) throw new ResourceNotFoundException('ReportSchedule', id);
    return schedule;
  }

  async deactivate(id: string) {
    await this.findById(id);
    await this.repo.update(id, { status: ScheduleStatus.INACTIVE });
    return this.repo.findById(id);
  }
}
