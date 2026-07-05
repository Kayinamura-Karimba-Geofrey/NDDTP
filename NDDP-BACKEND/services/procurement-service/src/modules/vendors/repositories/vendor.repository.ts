import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../../../database/entities/vendor.entity';
import { VendorStatus } from '../../../common/enums';

@Injectable()
export class VendorRepository {
  constructor(@InjectRepository(Vendor) private readonly repo: Repository<Vendor>) {}

  create(data: Partial<Vendor>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: VendorStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
