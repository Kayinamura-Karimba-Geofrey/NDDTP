import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingCriteria } from '../../../database/entities/rating-criteria.entity';

@Injectable()
export class CriteriaRepository {
  constructor(@InjectRepository(RatingCriteria) private readonly repo: Repository<RatingCriteria>) {}

  findActive() {
    return this.repo.find({ where: { isActive: true }, order: { weight: 'DESC' } });
  }

  findById(id: string) { return this.repo.findOne({ where: { id } }); }
}
