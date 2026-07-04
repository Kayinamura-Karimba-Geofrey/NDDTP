import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate, Application, ApplicationStatusHistory } from '../../database/entities';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { CandidateRepository, ApplicationRepository, ApplicationStatusHistoryRepository } from './repositories/application.repository';
import { JobPostingModule } from '../job-postings/job-posting.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Application, ApplicationStatusHistory]),
    JobPostingModule,
    EventsModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, CandidateRepository, ApplicationRepository, ApplicationStatusHistoryRepository],
  exports: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
