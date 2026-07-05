import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiRoute } from '../../../database/entities/api-route.entity';
import { RouteStatus } from '../../../common/enums';

@Injectable()
export class RouteRepository {
  constructor(@InjectRepository(ApiRoute) private readonly repo: Repository<ApiRoute>) {}

  create(data: Partial<ApiRoute>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['product'] }); }
  findByProductAndCode(productId: string, code: string) {
    return this.repo.findOne({ where: { productId, code } });
  }
  findByProduct(productId: string) {
    return this.repo.find({ where: { productId, status: RouteStatus.ACTIVE }, order: { name: 'ASC' } });
  }
}
