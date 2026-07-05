import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { WorkflowTaskRepository } from './repositories/workflow-task.repository';
import { WorkflowInstanceService } from '../instances/workflow-instance.service';
import { WorkflowLogRepository } from '../logs/repositories/workflow-log.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { DecideTaskDto } from './dto/workflow-task.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/workflow.exceptions';
import { TaskStatus, InstanceStatus } from '../../common/enums';
import { TASK_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class WorkflowTaskService {
  private readonly logger = new Logger(WorkflowTaskService.name);

  constructor(
    private readonly repo: WorkflowTaskRepository,
    @Inject(forwardRef(() => WorkflowInstanceService))
    private readonly instanceService: WorkflowInstanceService,
    private readonly logRepo: WorkflowLogRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async approve(id: string, decidedBy: string, dto: DecideTaskDto) {
    const task = await this.findById(id);
    this.assertTransition(task.status, TaskStatus.APPROVED);
    await this.validateCurrentStep(task);

    await this.repo.update(id, {
      status: TaskStatus.APPROVED,
      decidedBy,
      decidedAt: new Date(),
      comments: dto.comments ?? null,
      assigneeId: decidedBy,
    });
    await this.logRepo.create({
      instanceId: task.instanceId, eventType: 'TASK_APPROVED',
      notes: `Step ${task.stepOrder}: ${dto.comments ?? 'Approved'}`, recordedBy: decidedBy,
    });
    await this.publisher.publishTaskApproved({
      taskId: id, instanceId: task.instanceId, stepOrder: task.stepOrder, decidedBy,
    });

    const allTasks = await this.repo.findByInstanceId(task.instanceId);
    const nextTask = allTasks.find((t) => t.stepOrder === task.stepOrder + 1);

    if (nextTask) {
      await this.instanceService.advanceStep(task.instanceId, nextTask.stepOrder);
      await this.publisher.publishTaskAssigned({
        taskId: nextTask.id, instanceId: task.instanceId, stepOrder: nextTask.stepOrder, approverRole: nextTask.approverRole,
      });
    } else {
      await this.instanceService.markCompleted(task.instanceId);
    }

    this.logger.log(`Task ${id} approved`);
    return this.repo.findById(id);
  }

  async reject(id: string, decidedBy: string, dto: DecideTaskDto) {
    const task = await this.findById(id);
    this.assertTransition(task.status, TaskStatus.REJECTED);
    await this.validateCurrentStep(task);

    await this.repo.update(id, {
      status: TaskStatus.REJECTED,
      decidedBy,
      decidedAt: new Date(),
      comments: dto.comments ?? null,
      assigneeId: decidedBy,
    });
    await this.logRepo.create({
      instanceId: task.instanceId, eventType: 'TASK_REJECTED',
      notes: `Step ${task.stepOrder}: ${dto.comments ?? 'Rejected'}`, recordedBy: decidedBy,
    });
    await this.publisher.publishTaskRejected({
      taskId: id, instanceId: task.instanceId, stepOrder: task.stepOrder, reason: dto.comments,
    });
    await this.instanceService.markRejected(task.instanceId, dto.comments);
    this.logger.log(`Task ${id} rejected`);
    return this.repo.findById(id);
  }

  async skip(id: string, decidedBy: string, dto: DecideTaskDto) {
    const task = await this.findById(id);
    if (task.step?.isRequired) {
      throw new BusinessRuleViolationException('Required steps cannot be skipped');
    }
    this.assertTransition(task.status, TaskStatus.SKIPPED);
    await this.validateCurrentStep(task);

    await this.repo.update(id, {
      status: TaskStatus.SKIPPED,
      decidedBy,
      decidedAt: new Date(),
      comments: dto.comments ?? null,
      assigneeId: decidedBy,
    });

    const allTasks = await this.repo.findByInstanceId(task.instanceId);
    const nextTask = allTasks.find((t) => t.stepOrder === task.stepOrder + 1);

    if (nextTask) {
      await this.instanceService.advanceStep(task.instanceId, nextTask.stepOrder);
      await this.publisher.publishTaskAssigned({
        taskId: nextTask.id, instanceId: task.instanceId, stepOrder: nextTask.stepOrder, approverRole: nextTask.approverRole,
      });
    } else {
      await this.instanceService.markCompleted(task.instanceId);
    }

    return this.repo.findById(id);
  }

  findByInstanceId(instanceId: string) {
    return this.repo.findByInstanceId(instanceId);
  }

  findPending(page = 1, limit = 20, approverRole?: string) {
    return this.repo.findPending(page, limit, approverRole);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findMine(userId, page, limit);
  }

  async findById(id: string) {
    const task = await this.repo.findById(id);
    if (!task) throw new ResourceNotFoundException('WorkflowTask', id);
    return task;
  }

  private async validateCurrentStep(task: { instanceId: string; stepOrder: number; instance?: { status: InstanceStatus; currentStep: number } }) {
    const instance = task.instance || await this.instanceService.findById(task.instanceId);
    if (instance.status !== InstanceStatus.RUNNING) {
      throw new BusinessRuleViolationException('Workflow instance is not running');
    }
    if (instance.currentStep !== task.stepOrder) {
      throw new BusinessRuleViolationException('This is not the current workflow step');
    }
  }

  private assertTransition(from: TaskStatus, to: TaskStatus) {
    const allowed = TASK_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
