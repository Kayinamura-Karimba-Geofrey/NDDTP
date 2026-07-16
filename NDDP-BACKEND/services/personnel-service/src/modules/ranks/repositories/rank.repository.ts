import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from '../../../database/entities/rank.entity';
import { RankHistory } from '../../../database/entities/rank-history.entity';

@Injectable()
export class RankRepository {
  constructor(@InjectRepository(Rank) private readonly repo: Repository<Rank>) {}
  create(data: Partial<Rank>) { return this.repo.save(this.repo.create(data)); }
  findAll() { return this.repo.find({ where: { isActive: true }, order: { level: 'ASC' } }); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
}

@Injectable()
export class RankHistoryRepository {
  constructor(@InjectRepository(RankHistory) private readonly repo: Repository<RankHistory>) {}
  create(data: Partial<RankHistory>) { return this.repo.save(this.repo.create(data)); }
  async endCurrent(personnelRecordId: string, endDate: string) {
    await this.repo.update({ personnelRecordId, isCurrent: true }, { isCurrent: false, endDate });
  }
  findByPersonnel(personnelRecordId: string) {
    return this.repo.find({ where: { personnelRecordId }, relations: ['rank'], order: { effectiveDate: 'DESC' } });
  }
}
