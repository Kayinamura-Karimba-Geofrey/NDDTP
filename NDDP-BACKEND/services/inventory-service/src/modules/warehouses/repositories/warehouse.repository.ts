import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../../../database/entities/warehouse.entity';
import { WarehouseStatus } from '../../../common/enums';

@Injectable()
export class WarehouseRepository {
  constructor(@InjectRepository(Warehouse) private readonly repo: Repository<Warehouse>) {}

  create(data: Partial<Warehouse>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: WarehouseStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
