import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupJob } from '../../database/entities/backup-job.entity';
import { JobRepository } from './repositories/job.repository';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PolicyModule } from '../policies/policy.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([BackupJob]), PolicyModule, EventsModule],
  controllers: [JobController],
  providers: [JobRepository, JobService],
  exports: [JobRepository, JobService],
})
export class JobModule {}
