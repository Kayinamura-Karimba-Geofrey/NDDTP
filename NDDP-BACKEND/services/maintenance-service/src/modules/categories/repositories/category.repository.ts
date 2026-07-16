import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceCategory } from '../../../database/entities/maintenance-category.entity';

@Injectable()
export class CategoryRepository {
  constructor(@InjectRepository(MaintenanceCategory) private readonly repo: Repository<MaintenanceCategory>) {}

  create(data: Partial<MaintenanceCategory>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
}
