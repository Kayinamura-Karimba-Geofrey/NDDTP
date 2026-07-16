import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from '../../../database/entities/dashboard.entity';
import { DashboardStatus } from '../../../common/enums';

@Injectable()
export class DashboardRepository {
  constructor(@InjectRepository(Dashboard) private readonly repo: Repository<Dashboard>) {}

  create(data: Partial<Dashboard>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: DashboardStatus.ACTIVE }, order: { name: 'ASC' } }); }
  findByCreator(userId: string) { return this.repo.find({ where: { createdBy: userId }, order: { updatedAt: 'DESC' } }); }
  update(id: string, data: Partial<Dashboard>) { return this.repo.update(id, data as Record<string, unknown>); }
}
