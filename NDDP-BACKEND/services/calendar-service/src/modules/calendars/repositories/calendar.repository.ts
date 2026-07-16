import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from '../../../database/entities/calendar.entity';
import { CalendarStatus } from '../../../common/enums';

@Injectable()
export class CalendarRepository {
  constructor(@InjectRepository(Calendar) private readonly repo: Repository<Calendar>) {}

  create(data: Partial<Calendar>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: CalendarStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
