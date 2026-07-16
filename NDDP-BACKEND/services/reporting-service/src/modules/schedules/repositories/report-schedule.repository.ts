import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportSchedule } from '../../../database/entities/report-schedule.entity';
import { ScheduleStatus } from '../../../common/enums';

@Injectable()
export class ReportScheduleRepository {
  constructor(@InjectRepository(ReportSchedule) private readonly repo: Repository<ReportSchedule>) {}

  create(data: Partial<ReportSchedule>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<ReportSchedule>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['definition'] }); }
  findActive() { return this.repo.find({ where: { status: ScheduleStatus.ACTIVE }, relations: ['definition'], order: { createdAt: 'DESC' } }); }
}
