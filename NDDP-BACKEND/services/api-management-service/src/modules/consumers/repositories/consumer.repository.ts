import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiConsumer } from '../../../database/entities/api-consumer.entity';
import { ConsumerStatus } from '../../../common/enums';

@Injectable()
export class ConsumerRepository {
  constructor(@InjectRepository(ApiConsumer) private readonly repo: Repository<ApiConsumer>) {}

  create(data: Partial<ApiConsumer>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<ApiConsumer>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['keys'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: ConsumerStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
