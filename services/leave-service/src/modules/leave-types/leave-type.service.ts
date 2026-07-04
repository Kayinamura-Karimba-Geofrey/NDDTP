import { Injectable } from '@nestjs/common';
import { LeaveTypeRepository } from './repositories/leave-type.repository';
import { ResourceNotFoundException } from '../../common/exceptions/leave.exceptions';

@Injectable()
export class LeaveTypeService {
  constructor(private readonly repo: LeaveTypeRepository) {}
  findAll() { return this.repo.findAll(); }
  async findById(id: string) {
    const lt = await this.repo.findById(id);
    if (!lt) throw new ResourceNotFoundException('LeaveType', id);
    return lt;
  }
}
