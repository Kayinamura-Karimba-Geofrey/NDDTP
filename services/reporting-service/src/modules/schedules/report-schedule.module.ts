import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSchedule } from '../../database/entities/report-schedule.entity';
import { ReportScheduleController } from './report-schedule.controller';
import { ReportScheduleService } from './report-schedule.service';
import { ReportScheduleRepository } from './repositories/report-schedule.repository';
import { ReportDefinitionModule } from '../definitions/report-definition.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSchedule]), ReportDefinitionModule, EventsModule],
  controllers: [ReportScheduleController],
  providers: [ReportScheduleService, ReportScheduleRepository],
  exports: [ReportScheduleRepository, ReportScheduleService],
})
export class ReportScheduleModule {}
