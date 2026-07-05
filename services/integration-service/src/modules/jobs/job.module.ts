import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationJob, IntegrationJobLog } from '../../database/entities';
import { JobRepository } from './repositories/job.repository';
import { JobLogRepository } from './repositories/job-log.repository';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { ConnectorModule } from '../connectors/connector.module';
import { EndpointModule } from '../endpoints/endpoint.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntegrationJob, IntegrationJobLog]),
    ConnectorModule,
    EndpointModule,
    EventsModule,
  ],
  controllers: [JobController],
  providers: [JobRepository, JobLogRepository, JobService],
})
export class JobModule {}
