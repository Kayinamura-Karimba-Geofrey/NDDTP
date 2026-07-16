import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowTask } from '../../database/entities/workflow-task.entity';
import { WorkflowTaskController } from './workflow-task.controller';
import { WorkflowTaskService } from './workflow-task.service';
import { WorkflowTaskRepository } from './repositories/workflow-task.repository';
import { WorkflowInstanceModule } from '../instances/workflow-instance.module';
import { WorkflowLogModule } from '../logs/workflow-log.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowTask]),
    forwardRef(() => WorkflowInstanceModule),
    WorkflowLogModule,
    EventsModule,
  ],
  controllers: [WorkflowTaskController],
  providers: [WorkflowTaskService, WorkflowTaskRepository],
  exports: [WorkflowTaskRepository, WorkflowTaskService],
})
export class WorkflowTaskModule {}
