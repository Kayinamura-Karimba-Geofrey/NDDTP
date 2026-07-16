import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrder } from '../../../database/entities/work-order.entity';
import { WorkOrderTask } from '../../../database/entities/work-order-task.entity';
import { MaintenanceLog } from '../../../database/entities/maintenance-log.entity';
import { WorkOrderStatus } from '../../../common/enums';

@Injectable()
export class WorkOrderRepository {
  constructor(
    @InjectRepository(WorkOrder) private readonly orderRepo: Repository<WorkOrder>,
    @InjectRepository(WorkOrderTask) private readonly taskRepo: Repository<WorkOrderTask>,
    @InjectRepository(MaintenanceLog) private readonly logRepo: Repository<MaintenanceLog>,
  ) {}

  async createWithTasks(order: Partial<WorkOrder>, tasks: Partial<WorkOrderTask>[]) {
    const saved = await this.orderRepo.save(this.orderRepo.create(order));
    if (tasks.length) {
      await this.taskRepo.save(tasks.map((t) => this.taskRepo.create({ ...t, workOrderId: saved.id })));
    }
    return this.findById(saved.id);
  }

  update(id: string, data: Partial<WorkOrder>) {
    return this.orderRepo.update(id, data as Record<string, unknown>);
  }

  findById(id: string) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['request', 'request.category', 'tasks'],
    });
  }

  createLog(data: Partial<MaintenanceLog>) {
    return this.logRepo.save(this.logRepo.create(data));
  }

  findLogs(workOrderId: string) {
    return this.logRepo.find({ where: { workOrderId }, order: { recordedAt: 'ASC' } });
  }

  async findAll(page: number, limit: number, status?: WorkOrderStatus, assignedTo?: string) {
    const qb = this.orderRepo.createQueryBuilder('o')
      .leftJoinAndSelect('o.request', 'request')
      .leftJoinAndSelect('o.tasks', 'tasks');
    if (status) qb.andWhere('o.status = :status', { status });
    if (assignedTo) qb.andWhere('o.assignedTo = :assignedTo', { assignedTo });
    const [data, total] = await qb.orderBy('o.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
