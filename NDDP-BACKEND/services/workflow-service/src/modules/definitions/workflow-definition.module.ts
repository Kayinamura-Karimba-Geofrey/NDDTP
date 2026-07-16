import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowDefinition } from '../../database/entities/workflow-definition.entity';
import { WorkflowStep } from '../../database/entities/workflow-step.entity';
import { WorkflowDefinitionController } from './workflow-definition.controller';
import { WorkflowDefinitionService } from './workflow-definition.service';
import { WorkflowDefinitionRepository } from './repositories/workflow-definition.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowDefinition, WorkflowStep]), EventsModule],
  controllers: [WorkflowDefinitionController],
  providers: [WorkflowDefinitionService, WorkflowDefinitionRepository],
  exports: [WorkflowDefinitionRepository, WorkflowDefinitionService],
})
export class WorkflowDefinitionModule {}
