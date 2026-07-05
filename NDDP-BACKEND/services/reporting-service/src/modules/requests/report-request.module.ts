import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportRequest } from '../../database/entities/report-request.entity';
import { ReportOutput } from '../../database/entities/report-output.entity';
import { ReportRequestController } from './report-request.controller';
import { ReportRequestService } from './report-request.service';
import { ReportRequestRepository } from './repositories/report-request.repository';
import { ReportOutputRepository } from './repositories/report-output.repository';
import { ReportDefinitionModule } from '../definitions/report-definition.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRequest, ReportOutput]), ReportDefinitionModule, EventsModule],
  controllers: [ReportRequestController],
  providers: [ReportRequestService, ReportRequestRepository, ReportOutputRepository],
  exports: [ReportRequestRepository, ReportRequestService],
})
export class ReportRequestModule {}
