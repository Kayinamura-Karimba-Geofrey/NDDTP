import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from '../../../database/entities/api-key.entity';
import { ApiKeyStatus } from '../../../common/enums';

@Injectable()
export class ApiKeyRepository {
  constructor(@InjectRepository(ApiKey) private readonly repo: Repository<ApiKey>) {}

  create(data: Partial<ApiKey>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<ApiKey>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['consumer'] }); }
  findByConsumer(consumerId: string) {
    return this.repo.find({ where: { consumerId }, order: { createdAt: 'DESC' } });
  }
  findActiveByConsumer(consumerId: string) {
    return this.repo.find({ where: { consumerId, status: ApiKeyStatus.ACTIVE } });
  }
}
