import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WelfareProgram } from '../../../database/entities/welfare-program.entity';
import { ProgramStatus } from '../../../common/enums';

@Injectable()
export class ProgramRepository {
  constructor(@InjectRepository(WelfareProgram) private readonly repo: Repository<WelfareProgram>) {}
  create(data: Partial<WelfareProgram>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: ProgramStatus.ACTIVE }, order: { name: 'ASC' } }); }
  findAll() { return this.repo.find({ order: { name: 'ASC' } }); }
}
