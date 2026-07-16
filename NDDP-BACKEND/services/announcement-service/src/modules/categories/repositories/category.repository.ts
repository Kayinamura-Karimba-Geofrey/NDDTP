import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementCategory } from '../../../database/entities/announcement-category.entity';
import { CategoryStatus } from '../../../common/enums';

@Injectable()
export class CategoryRepository {
  constructor(@InjectRepository(AnnouncementCategory) private readonly repo: Repository<AnnouncementCategory>) {}

  create(data: Partial<AnnouncementCategory>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: CategoryStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
