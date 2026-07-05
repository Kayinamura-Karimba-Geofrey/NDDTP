import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportDefinition } from '../../database/entities/report-definition.entity';
import { ReportDefinitionController } from './report-definition.controller';
import { ReportDefinitionService } from './report-definition.service';
import { ReportDefinitionRepository } from './repositories/report-definition.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportDefinition]), EventsModule],
  controllers: [ReportDefinitionController],
  providers: [ReportDefinitionService, ReportDefinitionRepository],
  exports: [ReportDefinitionRepository, ReportDefinitionService],
})
export class ReportDefinitionModule {}
