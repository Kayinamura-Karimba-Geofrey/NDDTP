import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingSession } from '../../database/entities/training-session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from './repositories/session.repository';
import { CourseModule } from '../courses/course.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingSession]), CourseModule, EventsModule],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
  exports: [SessionRepository],
})
export class SessionModule {}
