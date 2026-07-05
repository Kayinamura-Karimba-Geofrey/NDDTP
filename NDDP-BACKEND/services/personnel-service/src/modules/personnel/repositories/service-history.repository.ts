import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceHistory } from '../../../database/entities/service-history.entity';
import { ServiceEventType } from '../../../common/enums';

@Injectable()
export class ServiceHistoryRepository {
  constructor(@InjectRepository(ServiceHistory) private readonly repo: Repository<ServiceHistory>) {}

  create(data: Partial<ServiceHistory>): Promise<ServiceHistory> {
    return this.repo.save(this.repo.create(data));
  }

  findByPersonnelId(personnelRecordId: string, page: number, limit: number) {
    return this.repo.findAndCount({
      where: { personnelRecordId },
      order: { eventDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
