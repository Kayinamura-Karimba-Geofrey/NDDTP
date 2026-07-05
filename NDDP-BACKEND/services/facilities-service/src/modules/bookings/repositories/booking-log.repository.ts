import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingLog } from '../../../database/entities/booking-log.entity';

@Injectable()
export class BookingLogRepository {
  constructor(@InjectRepository(BookingLog) private readonly repo: Repository<BookingLog>) {}

  create(data: Partial<BookingLog>) { return this.repo.save(this.repo.create(data)); }

  findByBookingId(bookingId: string) {
    return this.repo.find({ where: { bookingId }, order: { recordedAt: 'ASC' } });
  }
}
