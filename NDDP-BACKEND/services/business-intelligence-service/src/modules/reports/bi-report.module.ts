import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiReportDefinition } from '../../database/entities/bi-report-definition.entity';
import { BiReportExecution } from '../../database/entities/bi-report-execution.entity';
import { BiReportDefinitionRepository } from './repositories/bi-report-definition.repository';
import { BiReportExecutionRepository } from './repositories/bi-report-execution.repository';
import { BiReportService } from './bi-report.service';
import { BiReportController } from './bi-report.controller';
import { SemanticModelModule } from '../models/semantic-model.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BiReportDefinition, BiReportExecution]),
    SemanticModelModule,
    EventsModule,
  ],
  controllers: [BiReportController],
  providers: [BiReportDefinitionRepository, BiReportExecutionRepository, BiReportService],
})
export class BiReportModule {}
