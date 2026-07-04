import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from '../../database/entities';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { InterviewRepository } from './repositories/interview.repository';
import { ApplicationModule } from '../applications/application.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interview]), ApplicationModule, EventsModule],
  controllers: [InterviewController],
  providers: [InterviewService, InterviewRepository],
})
export class InterviewModule {}
