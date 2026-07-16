import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from '../../../database/entities/assignment.entity';

@Injectable()
export class AssignmentRepository {
  constructor(@InjectRepository(Assignment) private readonly repo: Repository<Assignment>) {}
  create(data: Partial<Assignment>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Assignment>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['unit'] }); }
  async endCurrent(personnelRecordId: string, endDate: string) {
    await this.repo.update({ personnelRecordId, isCurrent: true }, { isCurrent: false, endDate });
  }
  findByPersonnel(personnelRecordId: string) {
    return this.repo.find({ where: { personnelRecordId }, relations: ['unit'], order: { startDate: 'DESC' } });
  }
}
