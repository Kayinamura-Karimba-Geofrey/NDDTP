import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpaceBooking } from '../../../database/entities/space-booking.entity';
import { BookingStatus } from '../../../common/enums';

@Injectable()
export class SpaceBookingRepository {
  constructor(@InjectRepository(SpaceBooking) private readonly repo: Repository<SpaceBooking>) {}

  create(data: Partial<SpaceBooking>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<SpaceBooking>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['space', 'space.facility'] });
  }

  async findAll(page: number, limit: number, status?: BookingStatus, spaceId?: string, bookedBy?: string) {
    const qb = this.repo.createQueryBuilder('b')
      .leftJoinAndSelect('b.space', 'space')
      .leftJoinAndSelect('space.facility', 'facility');
    if (status) qb.andWhere('b.status = :status', { status });
    if (spaceId) qb.andWhere('b.spaceId = :spaceId', { spaceId });
    if (bookedBy) qb.andWhere('b.bookedBy = :bookedBy', { bookedBy });
    const [data, total] = await qb.orderBy('b.startTime', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  countConflicts(spaceId: string, startTime: Date, endTime: Date, excludeId?: string) {
    const qb = this.repo.createQueryBuilder('b')
      .where('b.spaceId = :spaceId', { spaceId })
      .andWhere('b.status IN (:...active)', { active: [BookingStatus.PENDING, BookingStatus.APPROVED, BookingStatus.ACTIVE] })
      .andWhere('b.startTime < :endTime AND b.endTime > :startTime', { startTime, endTime });
    if (excludeId) qb.andWhere('b.id != :excludeId', { excludeId });
    return qb.getCount();
  }
}
