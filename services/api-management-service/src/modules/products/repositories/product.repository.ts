import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiProduct } from '../../../database/entities/api-product.entity';
import { ProductStatus } from '../../../common/enums';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(ApiProduct) private readonly repo: Repository<ApiProduct>) {}

  create(data: Partial<ApiProduct>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: ProductStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
