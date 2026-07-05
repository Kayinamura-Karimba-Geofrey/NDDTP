import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckInLog } from '../../../database/entities/check-in-log.entity';
import { CheckInType } from '../../../common/enums';

@Injectable()
export class CheckInRepository {
  constructor(@InjectRepository(CheckInLog) private readonly repo: Repository<CheckInLog>) {}

  create(data: Partial<CheckInLog>) { return this.repo.save(this.repo.create(data)); }

  findByVisitId(visitId: string) {
    return this.repo.find({ where: { visitId }, relations: ['site'], order: { recordedAt: 'ASC' } });
  }

  findLatestByVisitAndType(visitId: string, checkType: CheckInType) {
    return this.repo.findOne({ where: { visitId, checkType }, order: { recordedAt: 'DESC' } });
  }
}
