import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingCourse } from '../../../database/entities/training-course.entity';
import { CourseStatus } from '../../../common/enums';

@Injectable()
export class CourseRepository {
  constructor(@InjectRepository(TrainingCourse) private readonly repo: Repository<TrainingCourse>) {}

  create(data: Partial<TrainingCourse>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<TrainingCourse>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }

  findActive() {
    return this.repo.find({ where: { status: CourseStatus.ACTIVE }, order: { name: 'ASC' } });
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({ order: { name: 'ASC' }, skip: (page - 1) * limit, take: limit });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
