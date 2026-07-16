import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventAttendee } from '../../../database/entities/event-attendee.entity';
import { EventStatus, RsvpStatus } from '../../../common/enums';

@Injectable()
export class EventAttendeeRepository {
  constructor(@InjectRepository(EventAttendee) private readonly repo: Repository<EventAttendee>) {}

  create(data: Partial<EventAttendee>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<EventAttendee>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['event'] });
  }

  findByEventAndUser(eventId: string, userId: string) {
    return this.repo.findOne({ where: { eventId, userId } });
  }

  findByEventId(eventId: string) {
    return this.repo.find({ where: { eventId }, order: { createdAt: 'ASC' } });
  }

  findByUserId(userId: string, rsvpStatus?: RsvpStatus) {
    const where: Record<string, unknown> = { userId };
    if (rsvpStatus) where.rsvpStatus = rsvpStatus;
    return this.repo.find({ where, relations: ['event', 'event.calendar'], order: { createdAt: 'DESC' } });
  }

  countUserConflicts(userId: string, startTime: Date, endTime: Date, excludeEventId?: string) {
    const qb = this.repo.createQueryBuilder('a')
      .innerJoin('a.event', 'e')
      .where('a.userId = :userId', { userId })
      .andWhere('a.rsvpStatus IN (:...accepted)', { accepted: [RsvpStatus.ACCEPTED, RsvpStatus.PENDING] })
      .andWhere('e.status = :status', { status: EventStatus.SCHEDULED })
      .andWhere('e.startTime < :endTime AND e.endTime > :startTime', { startTime, endTime });
    if (excludeEventId) qb.andWhere('e.id != :excludeEventId', { excludeEventId });
    return qb.getCount();
  }
}
