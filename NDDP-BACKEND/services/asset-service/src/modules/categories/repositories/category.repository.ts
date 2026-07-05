import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetCategory } from '../../../database/entities/asset-category.entity';

@Injectable()
export class CategoryRepository {
  constructor(@InjectRepository(AssetCategory) private readonly repo: Repository<AssetCategory>) {}

  create(data: Partial<AssetCategory>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
}
