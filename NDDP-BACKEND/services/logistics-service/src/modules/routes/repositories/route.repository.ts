import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportRoute } from '../../../database/entities/transport-route.entity';
import { RouteStatus } from '../../../common/enums';

@Injectable()
export class RouteRepository {
  constructor(@InjectRepository(TransportRoute) private readonly repo: Repository<TransportRoute>) {}

  create(data: Partial<TransportRoute>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['originLocation', 'destinationLocation'] });
  }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() {
    return this.repo.find({
      where: { status: RouteStatus.ACTIVE },
      relations: ['originLocation', 'destinationLocation'],
      order: { name: 'ASC' },
    });
  }
}
