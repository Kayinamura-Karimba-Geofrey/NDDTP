import { Injectable, Logger } from '@nestjs/common';
import { CalendarRepository } from './repositories/calendar.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateCalendarDto } from './dto/calendar.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/calendar.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { CalendarStatus } from '../../common/enums';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);

  constructor(
    private readonly repo: CalendarRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateCalendarDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const calendar = await this.repo.create({
      code: dto.code,
      name: dto.name,
      calendarType: dto.calendarType,
      ownerId: dto.ownerId ?? null,
      departmentId: dto.departmentId ?? null,
      status: CalendarStatus.ACTIVE,
      description: dto.description ?? null,
    });

    await this.redis.del(CACHE_KEYS.CALENDARS);
    await this.publisher.publishCalendarCreated({ calendarId: calendar.id, code: calendar.code });
    this.logger.log(`Calendar created: ${calendar.code}`);
    return calendar;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.CALENDARS);
    if (cached) return JSON.parse(cached);
    const calendars = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.CALENDARS, JSON.stringify(calendars), 600);
    return calendars;
  }

  async findById(id: string) {
    const calendar = await this.repo.findById(id);
    if (!calendar) throw new ResourceNotFoundException('Calendar', id);
    return calendar;
  }
}
