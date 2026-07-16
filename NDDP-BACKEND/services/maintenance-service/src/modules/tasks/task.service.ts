import { Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { WorkOrderRepository } from '../work-orders/repositories/work-order.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/maintenance.exceptions';
import { CompleteTaskDto } from './dto/task.dto';
import { TaskStatus, WorkOrderStatus } from '../../common/enums';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly repo: TaskRepository,
    private readonly workOrderRepo: WorkOrderRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async start(id: string, userId: string) {
    const task = await this.findById(id);
    if (task.status !== TaskStatus.PENDING) {
      throw new BusinessRuleViolationException('Only pending tasks can be started');
    }
    if (task.workOrder.status !== WorkOrderStatus.IN_PROGRESS) {
      throw new BusinessRuleViolationException('Work order must be IN_PROGRESS to start tasks');
    }

    await this.repo.update(id, { status: TaskStatus.IN_PROGRESS });
    await this.workOrderRepo.createLog({ workOrderId: task.workOrderId, eventType: 'TASK_STARTED', notes: task.description, recordedBy: userId });
    return this.repo.findById(id);
  }

  async complete(id: string, userId: string, dto: CompleteTaskDto) {
    const task = await this.findById(id);
    if (![TaskStatus.PENDING, TaskStatus.IN_PROGRESS].includes(task.status)) {
      throw new BusinessRuleViolationException('Task cannot be completed from current status');
    }

    await this.repo.update(id, { status: TaskStatus.COMPLETED, completedAt: new Date(), completedBy: userId });
    await this.workOrderRepo.createLog({
      workOrderId: task.workOrderId, eventType: 'TASK_COMPLETED', notes: dto.notes ?? task.description, recordedBy: userId,
    });
    await this.publisher.publishTaskCompleted({ taskId: id, workOrderId: task.workOrderId, description: task.description });
    this.logger.log(`Task completed: ${id}`);
    return this.repo.findById(id);
  }

  async skip(id: string, userId: string) {
    const task = await this.findById(id);
    if (task.status === TaskStatus.COMPLETED) {
      throw new BusinessRuleViolationException('Completed tasks cannot be skipped');
    }
    await this.repo.update(id, { status: TaskStatus.SKIPPED, completedAt: new Date(), completedBy: userId });
    await this.workOrderRepo.createLog({ workOrderId: task.workOrderId, eventType: 'TASK_SKIPPED', notes: task.description, recordedBy: userId });
    return this.repo.findById(id);
  }

  findByWorkOrder(workOrderId: string) {
    return this.repo.findByWorkOrder(workOrderId);
  }

  async findById(id: string) {
    const task = await this.repo.findById(id);
    if (!task) throw new ResourceNotFoundException('WorkOrderTask', id);
    return task;
  }
}
