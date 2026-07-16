import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingCriteria } from '../../database/entities/rating-criteria.entity';
import { CriteriaController } from './criteria.controller';
import { CriteriaService } from './criteria.service';
import { CriteriaRepository } from './repositories/criteria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RatingCriteria])],
  controllers: [CriteriaController],
  providers: [CriteriaService, CriteriaRepository],
  exports: [CriteriaRepository],
})
export class CriteriaModule {}
