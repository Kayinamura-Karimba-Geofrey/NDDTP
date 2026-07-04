import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalAppointment } from '../../../database/entities/medical-appointment.entity';
import { AppointmentStatus } from '../../../common/enums';

@Injectable()
export class AppointmentRepository {
  constructor(@InjectRepository(MedicalAppointment) private readonly repo: Repository<MedicalAppointment>) {}

  create(data: Partial<MedicalAppointment>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<MedicalAppointment>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['facility'] });
  }

  async findAll(page: number, limit: number, status?: AppointmentStatus, userId?: string, facilityId?: string) {
    const qb = this.repo.createQueryBuilder('a').leftJoinAndSelect('a.facility', 'facility');
    if (status) qb.andWhere('a.status = :status', { status });
    if (userId) qb.andWhere('a.userId = :userId', { userId });
    if (facilityId) qb.andWhere('a.facilityId = :facilityId', { facilityId });
    const [data, total] = await qb.orderBy('a.scheduledAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  countByFacilityAndDate(facilityId: string, date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return this.repo.createQueryBuilder('a')
      .where('a.facilityId = :facilityId', { facilityId })
      .andWhere('a.scheduledAt BETWEEN :start AND :end', { start, end })
      .andWhere('a.status NOT IN (:...cancelled)', { cancelled: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] })
      .getCount();
  }
}
