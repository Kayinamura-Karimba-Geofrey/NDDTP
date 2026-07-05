import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrderTask } from '../../database/entities/work-order-task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './repositories/task.repository';
import { WorkOrderModule } from '../work-orders/work-order.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrderTask]), WorkOrderModule, EventsModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
