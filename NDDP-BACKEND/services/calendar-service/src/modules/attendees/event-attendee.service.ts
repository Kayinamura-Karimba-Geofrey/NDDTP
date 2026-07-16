import { Injectable, Logger } from '@nestjs/common';
import { EventAttendeeRepository } from './repositories/event-attendee.repository';
import { CalendarEventRepository } from '../events/repositories/calendar-event.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { InviteAttendeeDto, RespondRsvpDto } from './dto/attendee.dto';
import {
  ResourceNotFoundException, DuplicateResourceException,
  BusinessRuleViolationException, ScheduleConflictException,
} from '../../common/exceptions/calendar.exceptions';
import { EventStatus, RsvpStatus } from '../../common/enums';

@Injectable()
export class EventAttendeeService {
  private readonly logger = new Logger(EventAttendeeService.name);

  constructor(
    private readonly repo: EventAttendeeRepository,
    private readonly eventRepo: CalendarEventRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async invite(eventId: string, invitedBy: string, dto: InviteAttendeeDto) {
    const event = await this.eventRepo.findById(eventId);
    if (!event) throw new ResourceNotFoundException('CalendarEvent', eventId);
    if (event.status !== EventStatus.SCHEDULED) {
      throw new BusinessRuleViolationException('Can only invite attendees to scheduled events');
    }

    const existing = await this.repo.findByEventAndUser(eventId, dto.userId);
    if (existing) throw new DuplicateResourceException('userId', dto.userId);

    const conflicts = await this.repo.countUserConflicts(dto.userId, event.startTime, event.endTime, eventId);
    if (conflicts > 0) throw new ScheduleConflictException('Attendee has a conflicting event');

    const attendee = await this.repo.create({
      eventId,
      userId: dto.userId,
      rsvpStatus: RsvpStatus.PENDING,
      invitedBy,
    });

    await this.publisher.publishAttendeeInvited({
      attendeeId: attendee.id, eventId, userId: dto.userId, invitedBy,
    });
    this.logger.log(`Attendee ${dto.userId} invited to event ${event.eventNumber}`);
    return attendee;
  }

  async respond(id: string, userId: string, dto: RespondRsvpDto) {
    const attendee = await this.findById(id);
    if (attendee.userId !== userId) {
      throw new BusinessRuleViolationException('You can only respond to your own invitations');
    }
    if (![RsvpStatus.ACCEPTED, RsvpStatus.DECLINED, RsvpStatus.TENTATIVE].includes(dto.rsvpStatus)) {
      throw new BusinessRuleViolationException('Invalid RSVP response');
    }

    if (dto.rsvpStatus === RsvpStatus.ACCEPTED && attendee.event) {
      const conflicts = await this.repo.countUserConflicts(
        userId, attendee.event.startTime, attendee.event.endTime, attendee.eventId,
      );
      if (conflicts > 0) throw new ScheduleConflictException('You have a conflicting event');
    }

    await this.repo.update(id, { rsvpStatus: dto.rsvpStatus, respondedAt: new Date() });
    await this.publisher.publishAttendeeResponded({
      attendeeId: id, eventId: attendee.eventId, userId, rsvpStatus: dto.rsvpStatus,
    });
    return this.repo.findById(id);
  }

  findByEventId(eventId: string) {
    return this.repo.findByEventId(eventId);
  }

  findMine(userId: string, rsvpStatus?: RsvpStatus) {
    return this.repo.findByUserId(userId, rsvpStatus);
  }

  async findById(id: string) {
    const attendee = await this.repo.findById(id);
    if (!attendee) throw new ResourceNotFoundException('EventAttendee', id);
    return attendee;
  }
}
