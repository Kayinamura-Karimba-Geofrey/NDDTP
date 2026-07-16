import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PlanRepository } from './repositories/plan.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/performance.exceptions';
import { CreatePlanDto } from './dto/plan.dto';
import { PlanStatus } from '../../common/enums';

@Injectable()
export class PlanService {
  private readonly logger = new Logger(PlanService.name);

  constructor(
    private readonly repo: PlanRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(managerId: string, dto: CreatePlanDto) {
    if (new Date(dto.endDate) < new Date(dto.startDate)) {
      throw new BusinessRuleViolationException('End date must be on or after start date');
    }

    const planNumber = `PIP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const plan = await this.repo.create({
      planNumber,
      userId: dto.userId,
      reviewId: dto.reviewId ?? null,
      managerId,
      objectives: dto.objectives,
      milestones: dto.milestones ?? null,
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: PlanStatus.DRAFT,
    });

    await this.publisher.publishPlanCreated({ planId: plan.id, planNumber, userId: dto.userId, managerId });
    this.logger.log(`Improvement plan ${planNumber} created`);
    return plan;
  }

  async activate(id: string) {
    const plan = await this.findById(id);
    if (plan.status !== PlanStatus.DRAFT) {
      throw new BusinessRuleViolationException('Only draft plans can be activated');
    }

    await this.repo.update(id, { status: PlanStatus.ACTIVE, activatedAt: new Date() });
    await this.publisher.publishPlanActivated({ planId: id, planNumber: plan.planNumber, userId: plan.userId });
    return this.repo.findById(id);
  }

  async complete(id: string) {
    const plan = await this.findById(id);
    if (plan.status !== PlanStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Only active plans can be completed');
    }

    await this.repo.update(id, { status: PlanStatus.COMPLETED, completedAt: new Date() });
    await this.publisher.publishPlanCompleted({ planId: id, planNumber: plan.planNumber, userId: plan.userId });
    return this.repo.findById(id);
  }

  async cancel(id: string) {
    const plan = await this.findById(id);
    if ([PlanStatus.COMPLETED, PlanStatus.CANCELLED].includes(plan.status)) {
      throw new BusinessRuleViolationException('Plan cannot be cancelled');
    }
    await this.repo.update(id, { status: PlanStatus.CANCELLED });
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const plan = await this.repo.findById(id);
    if (!plan) throw new ResourceNotFoundException('ImprovementPlan', id);
    return plan;
  }

  findAll(filter: { page?: number; limit?: number; userId?: string; status?: PlanStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.userId, filter.status);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, userId);
  }
}
