import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './repositories/department.repository';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentFilterDto } from './dto/department.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/user.exceptions';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { Department } from '../../database/entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(private readonly repo: DepartmentRepository, private readonly redis: RedisService) {}

  async create(dto: CreateDepartmentDto) {
    if (await this.repo.findByCode(dto.code)) throw new DuplicateResourceException('code', dto.code);
    if (dto.parentId) {
      const parent = await this.repo.findById(dto.parentId);
      if (!parent) throw new ResourceNotFoundException('Department', dto.parentId);
    }
    const dept = await this.repo.create(dto);
    return this.toResponse(dept);
  }

  async findAll(filter: DepartmentFilterDto) {
    const result = await this.repo.findAll(filter.page || 1, filter.limit || 20, filter.search, filter.status);
    return { data: result.data.map((d) => this.toResponse(d)), meta: result.meta };
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.DEPARTMENT(id));
    if (cached) return JSON.parse(cached);

    const dept = await this.repo.findById(id);
    if (!dept) throw new ResourceNotFoundException('Department', id);

    const response = this.toResponse(dept);
    await this.redis.set(CACHE_KEYS.DEPARTMENT(id), JSON.stringify(response), 3600);
    return response;
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    const dept = await this.repo.findById(id);
    if (!dept) throw new ResourceNotFoundException('Department', id);
    await this.repo.update(id, dto);
    await this.redis.del(CACHE_KEYS.DEPARTMENT(id));
    return this.findById(id);
  }

  async delete(id: string) {
    const dept = await this.repo.findById(id);
    if (!dept) throw new ResourceNotFoundException('Department', id);
    await this.repo.softDelete(id);
    await this.redis.del(CACHE_KEYS.DEPARTMENT(id));
    return { message: 'Department deleted' };
  }

  private toResponse(d: Department) {
    return {
      id: d.id, code: d.code, name: d.name, description: d.description,
      type: d.type, parentId: d.parentId, status: d.status, headUserId: d.headUserId,
      createdAt: d.createdAt,
    };
  }
}
