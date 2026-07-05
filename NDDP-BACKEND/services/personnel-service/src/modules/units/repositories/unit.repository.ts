import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../../../database/entities/unit.entity';

@Injectable()
export class UnitRepository {
  constructor(@InjectRepository(Unit) private readonly repo: Repository<Unit>) {}
  create(data: Partial<Unit>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Unit>) { return this.repo.update(id, data as Record<string, unknown>); }
  findAll() { return this.repo.find({ where: { isActive: true }, relations: ['parentUnit'], order: { name: 'ASC' } }); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['parentUnit', 'children'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
}
