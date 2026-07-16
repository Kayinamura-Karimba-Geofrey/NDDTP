import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from '../../database/entities';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';
import { JobPostingRepository } from './repositories/job-posting.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting]), EventsModule],
  controllers: [JobPostingController],
  providers: [JobPostingService, JobPostingRepository],
  exports: [JobPostingService, JobPostingRepository],
})
export class JobPostingModule {}
