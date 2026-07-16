import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CalendarEventRepository } from './repositories/calendar-event.repository';
import { CalendarRepository } from '../calendars/repositories/calendar.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateEventDto } from './dto/calendar-event.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  BusinessRuleViolationException, ScheduleConflictException,
} from '../../common/exceptions/calendar.exceptions';
import { EventStatus, CalendarStatus, CalendarEventType } from '../../common/enums';
import { EVENT_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class CalendarEventService {
  private readonly logger = new Logger(CalendarEventService.name);

  constructor(
    private readonly repo: CalendarEventRepository,
    private readonly calendarRepo: CalendarRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateEventDto) {
    const calendar = await this.calendarRepo.findById(dto.calendarId);
    if (!calendar) throw new ResourceNotFoundException('Calendar', dto.calendarId);
    if (calendar.status !== CalendarStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Calendar is not active');
    }

    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);
    if (endTime <= startTime) throw new BusinessRuleViolationException('End time must be after start time');

    const eventNumber = `EVT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const event = await this.repo.create({
      eventNumber,
      calendarId: dto.calendarId,
      title: dto.title,
      description: dto.description ?? null,
      eventType: dto.eventType ?? CalendarEventType.MEETING,
      startTime,
      endTime,
      location: dto.location ?? null,
      status: EventStatus.DRAFT,
      createdBy,
    });

    this.logger.log(`Event created: ${eventNumber}`);
    return this.repo.findById(event.id);
  }

  async schedule(id: string, userId: string) {
    const event = await this.findById(id);
    if (event.createdBy !== userId) {
      throw new BusinessRuleViolationException('You can only schedule your own events');
    }
    this.assertTransition(event.status, EventStatus.SCHEDULED);

    if (event.startTime <= new Date()) {
      throw new BusinessRuleViolationException('Event must be scheduled in the future');
    }

    const conflicts = await this.repo.countConflicts(event.calendarId, event.startTime, event.endTime, id);
    if (conflicts > 0) throw new ScheduleConflictException('Calendar has a conflicting scheduled event');

    await this.repo.update(id, { status: EventStatus.SCHEDULED });
    await this.publisher.publishEventScheduled({
      eventId: id, eventNumber: event.eventNumber, calendarId: event.calendarId,
      startTime: event.startTime.toISOString(), endTime: event.endTime.toISOString(),
    });
    return this.repo.findById(id);
  }

  async complete(id: string) {
    const event = await this.findById(id);
    this.assertTransition(event.status, EventStatus.COMPLETED);
    await this.repo.update(id, { status: EventStatus.COMPLETED });
    await this.publisher.publishEventCompleted({ eventId: id, eventNumber: event.eventNumber });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const event = await this.findById(id);
    if (!isStaff && event.createdBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own events');
    }
    this.assertTransition(event.status, EventStatus.CANCELLED);
    await this.repo.update(id, { status: EventStatus.CANCELLED });
    await this.publisher.publishEventCancelled({ eventId: id, eventNumber: event.eventNumber });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; calendarId?: string; status?: EventStatus; from?: string; to?: string }) {
    const from = filter.from ? new Date(filter.from) : undefined;
    const to = filter.to ? new Date(filter.to) : undefined;
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.calendarId, filter.status, from, to);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, undefined, undefined, userId);
  }

  async findById(id: string) {
    const event = await this.repo.findById(id);
    if (!event) throw new ResourceNotFoundException('CalendarEvent', id);
    return event;
  }

  private assertTransition(from: EventStatus, to: EventStatus) {
    const allowed = EVENT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
