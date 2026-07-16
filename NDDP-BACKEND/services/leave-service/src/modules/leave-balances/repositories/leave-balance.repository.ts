import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveBalance } from '../../../database/entities/leave-balance.entity';

@Injectable()
export class LeaveBalanceRepository {
  constructor(@InjectRepository(LeaveBalance) private readonly repo: Repository<LeaveBalance>) {}

  create(data: Partial<LeaveBalance>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<LeaveBalance>) { return this.repo.update(id, data as Record<string, unknown>); }

  findByUserAndYear(userId: string, year: number) {
    return this.repo.find({ where: { userId, year }, relations: ['leaveType'], order: { leaveType: { name: 'ASC' } } });
  }

  findByUserTypeYear(userId: string, leaveTypeId: string, year: number) {
    return this.repo.findOne({ where: { userId, leaveTypeId, year }, relations: ['leaveType'] });
  }
}
