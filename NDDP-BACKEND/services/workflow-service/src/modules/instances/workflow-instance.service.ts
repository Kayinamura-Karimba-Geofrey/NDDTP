import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowInstanceRepository } from './repositories/workflow-instance.repository';
import { WorkflowDefinitionRepository } from '../definitions/repositories/workflow-definition.repository';
import { WorkflowTaskRepository } from '../tasks/repositories/workflow-task.repository';
import { WorkflowLogRepository } from '../logs/repositories/workflow-log.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateInstanceDto } from './dto/workflow-instance.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/workflow.exceptions';
import { InstanceStatus, DefinitionStatus, TaskStatus, WorkflowEntityType } from '../../common/enums';
import { INSTANCE_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class WorkflowInstanceService {
  private readonly logger = new Logger(WorkflowInstanceService.name);

  constructor(
    private readonly repo: WorkflowInstanceRepository,
    private readonly defRepo: WorkflowDefinitionRepository,
    private readonly taskRepo: WorkflowTaskRepository,
    private readonly logRepo: WorkflowLogRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(initiatedBy: string, dto: CreateInstanceDto) {
    const definition = await this.defRepo.findById(dto.definitionId);
    if (!definition) throw new ResourceNotFoundException('WorkflowDefinition', dto.definitionId);
    if (definition.status !== DefinitionStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Workflow definition is not active');
    }
    if (!definition.steps?.length) {
      throw new BusinessRuleViolationException('Workflow definition has no steps');
    }
    if (definition.entityType !== dto.entityType) {
      throw new BusinessRuleViolationException('Entity type does not match workflow definition');
    }

    const instanceNumber = `WFI-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const instance = await this.repo.create({
      instanceNumber,
      definitionId: dto.definitionId,
      entityType: dto.entityType,
      entityId: dto.entityId,
      initiatedBy,
      status: InstanceStatus.DRAFT,
      currentStep: 0,
      notes: dto.notes ?? null,
    });

    await this.logRepo.create({ instanceId: instance.id, eventType: 'CREATED', notes: null, recordedBy: initiatedBy });
    this.logger.log(`Workflow instance created: ${instanceNumber}`);
    return this.repo.findById(instance.id);
  }

  async start(id: string, userId: string) {
    const instance = await this.findById(id);
    if (instance.initiatedBy !== userId) {
      throw new BusinessRuleViolationException('You can only start your own workflow instances');
    }
    this.assertTransition(instance.status, InstanceStatus.RUNNING);

    const steps = instance.definition?.steps?.sort((a, b) => a.stepOrder - b.stepOrder) || [];
    for (const step of steps) {
      const task = await this.taskRepo.create({
        instanceId: id,
        stepId: step.id,
        stepOrder: step.stepOrder,
        approverRole: step.approverRole,
        status: TaskStatus.PENDING,
      });
      if (step.stepOrder === 1) {
        await this.publisher.publishTaskAssigned({
          taskId: task.id, instanceId: id, stepOrder: step.stepOrder, approverRole: step.approverRole,
        });
      }
    }

    await this.repo.update(id, { status: InstanceStatus.RUNNING, currentStep: 1 });
    await this.logRepo.create({ instanceId: id, eventType: 'STARTED', notes: null, recordedBy: userId });
    await this.publisher.publishInstanceStarted({
      instanceId: id, instanceNumber: instance.instanceNumber, entityType: instance.entityType, entityId: instance.entityId,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const instance = await this.findById(id);
    if (!isStaff && instance.initiatedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own workflow instances');
    }
    this.assertTransition(instance.status, InstanceStatus.CANCELLED);
    await this.repo.update(id, { status: InstanceStatus.CANCELLED });
    await this.logRepo.create({ instanceId: id, eventType: 'CANCELLED', notes: null, recordedBy: userId });
    await this.publisher.publishInstanceCancelled({ instanceId: id, instanceNumber: instance.instanceNumber });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: InstanceStatus; entityType?: WorkflowEntityType }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.entityType);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const instance = await this.repo.findById(id);
    if (!instance) throw new ResourceNotFoundException('WorkflowInstance', id);
    return instance;
  }

  async findLogs(id: string) {
    await this.findById(id);
    return this.logRepo.findByInstanceId(id);
  }

  async markCompleted(id: string) {
    const instance = await this.findById(id);
    this.assertTransition(instance.status, InstanceStatus.COMPLETED);
    await this.repo.update(id, { status: InstanceStatus.COMPLETED });
    await this.logRepo.create({ instanceId: id, eventType: 'COMPLETED', notes: null, recordedBy: instance.initiatedBy });
    await this.publisher.publishInstanceCompleted({
      instanceId: id, instanceNumber: instance.instanceNumber, entityType: instance.entityType, entityId: instance.entityId,
    });
    return this.repo.findById(id);
  }

  async markRejected(id: string, reason?: string) {
    const instance = await this.findById(id);
    this.assertTransition(instance.status, InstanceStatus.REJECTED);
    await this.repo.update(id, { status: InstanceStatus.REJECTED });
    await this.logRepo.create({ instanceId: id, eventType: 'REJECTED', notes: reason ?? null, recordedBy: instance.initiatedBy });
    await this.publisher.publishInstanceRejected({ instanceId: id, instanceNumber: instance.instanceNumber, reason });
    return this.repo.findById(id);
  }

  async advanceStep(id: string, nextStep: number) {
    await this.repo.update(id, { currentStep: nextStep });
  }

  private assertTransition(from: InstanceStatus, to: InstanceStatus) {
    const allowed = INSTANCE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
