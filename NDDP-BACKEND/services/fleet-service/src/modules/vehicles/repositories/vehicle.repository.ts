import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../../../database/entities/vehicle.entity';
import { VehicleStatus } from '../../../common/enums';

@Injectable()
export class VehicleRepository {
  constructor(@InjectRepository(Vehicle) private readonly repo: Repository<Vehicle>) {}

  create(data: Partial<Vehicle>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Vehicle>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['type'] });
  }

  findByRegistration(reg: string) {
    return this.repo.findOne({ where: { registrationNumber: reg } });
  }

  async findAll(page: number, limit: number, status?: VehicleStatus, typeId?: string) {
    const qb = this.repo.createQueryBuilder('v').leftJoinAndSelect('v.type', 'type');
    if (status) qb.andWhere('v.status = :status', { status });
    if (typeId) qb.andWhere('v.typeId = :typeId', { typeId });
    const [data, total] = await qb.orderBy('v.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
