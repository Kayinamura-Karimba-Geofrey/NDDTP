import { Injectable, Logger } from '@nestjs/common';
import { GoalRepository } from './repositories/goal.repository';
import { CycleRepository } from '../cycles/repositories/cycle.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/performance.exceptions';
import { CreateGoalDto, UpdateGoalProgressDto } from './dto/goal.dto';
import { CycleStatus, GoalStatus } from '../../common/enums';

@Injectable()
export class GoalService {
  private readonly logger = new Logger(GoalService.name);

  constructor(
    private readonly repo: GoalRepository,
    private readonly cycleRepo: CycleRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateGoalDto) {
    const cycle = await this.cycleRepo.findById(dto.cycleId);
    if (!cycle) throw new ResourceNotFoundException('PerformanceCycle', dto.cycleId);
    if (cycle.status === CycleStatus.CLOSED) {
      throw new BusinessRuleViolationException('Cannot add goals to a closed cycle');
    }

    const goal = await this.repo.create({
      userId,
      cycleId: dto.cycleId,
      title: dto.title,
      description: dto.description ?? null,
      targetDate: dto.targetDate ?? null,
      status: GoalStatus.ACTIVE,
    });

    await this.publisher.publishGoalCreated({ goalId: goal.id, userId, cycleId: dto.cycleId, title: dto.title });
    this.logger.log(`Goal created for user ${userId}`);
    return this.repo.findById(goal.id);
  }

  async updateProgress(id: string, userId: string, dto: UpdateGoalProgressDto) {
    const goal = await this.findById(id);
    if (goal.userId !== userId) throw new BusinessRuleViolationException('You can only update your own goals');

    const status = dto.progressPercent >= 100 ? GoalStatus.COMPLETED : GoalStatus.ACTIVE;
    await this.repo.update(id, { progressPercent: dto.progressPercent, status });

    if (status === GoalStatus.COMPLETED) {
      await this.publisher.publishGoalCompleted({ goalId: id, userId, title: goal.title });
    }
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const goal = await this.repo.findById(id);
    if (!goal) throw new ResourceNotFoundException('PerformanceGoal', id);
    return goal;
  }

  findAll(filter: { page?: number; limit?: number; userId?: string; cycleId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.userId, filter.cycleId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, userId);
  }
}
