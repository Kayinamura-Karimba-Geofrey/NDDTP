import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogisticsLocation } from '../../../database/entities/logistics-location.entity';
import { LocationStatus } from '../../../common/enums';

@Injectable()
export class LocationRepository {
  constructor(@InjectRepository(LogisticsLocation) private readonly repo: Repository<LogisticsLocation>) {}

  create(data: Partial<LogisticsLocation>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: LocationStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
