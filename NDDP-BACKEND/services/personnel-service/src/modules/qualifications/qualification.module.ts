import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qualification, PersonnelQualification } from '../../database/entities';
import { QualificationController } from './qualification.controller';
import { QualificationService } from './qualification.service';
import { QualificationRepository, PersonnelQualificationRepository } from './repositories/qualification.repository';
import { PersonnelModule } from '../personnel/personnel.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Qualification, PersonnelQualification]), PersonnelModule, EventsModule],
  controllers: [QualificationController],
  providers: [QualificationService, QualificationRepository, PersonnelQualificationRepository],
})
export class QualificationModule {}
