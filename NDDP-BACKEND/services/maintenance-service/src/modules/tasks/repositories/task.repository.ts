import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrderTask } from '../../../database/entities/work-order-task.entity';

@Injectable()
export class TaskRepository {
  constructor(@InjectRepository(WorkOrderTask) private readonly repo: Repository<WorkOrderTask>) {}

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['workOrder'] });
  }

  update(id: string, data: Partial<WorkOrderTask>) {
    return this.repo.update(id, data as Record<string, unknown>);
  }

  findByWorkOrder(workOrderId: string) {
    return this.repo.find({ where: { workOrderId }, order: { createdAt: 'ASC' } });
  }
}
