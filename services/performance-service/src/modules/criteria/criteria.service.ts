import { Injectable } from '@nestjs/common';
import { CriteriaRepository } from './repositories/criteria.repository';
import { RedisService } from '../cache/redis.module';
import { ResourceNotFoundException } from '../../common/exceptions/performance.exceptions';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class CriteriaService {
  constructor(
    private readonly repo: CriteriaRepository,
    private readonly redis: RedisService,
  ) {}

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.CRITERIA);
    if (cached) return JSON.parse(cached);

    const criteria = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.CRITERIA, JSON.stringify(criteria), 600);
    return criteria;
  }

  async findById(id: string) {
    const criteria = await this.repo.findById(id);
    if (!criteria) throw new ResourceNotFoundException('RatingCriteria', id);
    return criteria;
  }
}
