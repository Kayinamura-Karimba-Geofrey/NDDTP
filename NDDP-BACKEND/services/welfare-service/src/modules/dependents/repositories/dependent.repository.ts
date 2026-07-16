import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Dependent } from '../../../database/entities/dependent.entity';

@Injectable()
export class DependentRepository {
  constructor(@InjectRepository(Dependent) private readonly repo: Repository<Dependent>) {}
  create(data: Partial<Dependent>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Dependent>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id, deletedAt: IsNull() } }); }
  findByUser(userId: string) {
    return this.repo.find({ where: { userId, deletedAt: IsNull(), isActive: true }, order: { createdAt: 'DESC' } });
  }
  softDelete(id: string) { return this.repo.softDelete(id); }
}
