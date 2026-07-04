import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingCertification } from '../../database/entities/training-certification.entity';
import { CertificationController } from './certification.controller';
import { CertificationService } from './certification.service';
import { CertificationRepository } from './repositories/certification.repository';
import { EnrollmentModule } from '../enrollments/enrollment.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingCertification]), EnrollmentModule, EventsModule],
  controllers: [CertificationController],
  providers: [CertificationService, CertificationRepository],
})
export class CertificationModule {}
