import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveType } from '../../../database/entities/leave-type.entity';

@Injectable()
export class LeaveTypeRepository {
  constructor(@InjectRepository(LeaveType) private readonly repo: Repository<LeaveType>) {}
  findAll() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
}
