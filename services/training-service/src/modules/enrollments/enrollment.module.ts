import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingEnrollment } from '../../database/entities/training-enrollment.entity';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { SessionModule } from '../sessions/session.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingEnrollment]), SessionModule, EventsModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EnrollmentRepository],
  exports: [EnrollmentRepository],
})
export class EnrollmentModule {}
