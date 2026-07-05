import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RetentionPolicy } from '../../../database/entities/retention-policy.entity';

@Injectable()
export class RetentionPolicyRepository {
  constructor(@InjectRepository(RetentionPolicy) private readonly repo: Repository<RetentionPolicy>) {}

  findAllActive(): Promise<RetentionPolicy[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  findByCategory(category: string): Promise<RetentionPolicy | null> {
    return this.repo.findOne({ where: { category } });
  }
}
