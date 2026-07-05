import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessAssessment } from '../../database/entities/fitness-assessment.entity';
import { FitnessController } from './fitness.controller';
import { FitnessService } from './fitness.service';
import { FitnessRepository } from './repositories/fitness.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([FitnessAssessment]), EventsModule],
  controllers: [FitnessController],
  providers: [FitnessService, FitnessRepository],
})
export class FitnessModule {}
