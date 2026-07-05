import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringTarget } from '../../../database/entities/monitoring-target.entity';
import { TargetStatus } from '../../../common/enums';

@Injectable()
export class TargetRepository {
  constructor(@InjectRepository(MonitoringTarget) private readonly repo: Repository<MonitoringTarget>) {}

  create(data: Partial<MonitoringTarget>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: TargetStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
