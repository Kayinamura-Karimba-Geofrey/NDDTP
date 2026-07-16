import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowInstance } from '../../database/entities/workflow-instance.entity';
import { WorkflowInstanceController } from './workflow-instance.controller';
import { WorkflowInstanceService } from './workflow-instance.service';
import { WorkflowInstanceRepository } from './repositories/workflow-instance.repository';
import { WorkflowDefinitionModule } from '../definitions/workflow-definition.module';
import { WorkflowTaskModule } from '../tasks/workflow-task.module';
import { WorkflowLogModule } from '../logs/workflow-log.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowInstance]),
    WorkflowDefinitionModule,
    forwardRef(() => WorkflowTaskModule),
    WorkflowLogModule,
    EventsModule,
  ],
  controllers: [WorkflowInstanceController],
  providers: [WorkflowInstanceService, WorkflowInstanceRepository],
  exports: [WorkflowInstanceRepository, WorkflowInstanceService],
})
export class WorkflowInstanceModule {}
