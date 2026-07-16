import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SpaceBookingRepository } from './repositories/space-booking.repository';
import { BookingLogRepository } from './repositories/booking-log.repository';
import { FacilitySpaceRepository } from '../spaces/repositories/facility-space.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateBookingDto, RejectBookingDto } from './dto/booking.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  BusinessRuleViolationException, BookingConflictException,
} from '../../common/exceptions/facilities.exceptions';
import { BookingStatus, SpaceStatus } from '../../common/enums';
import { BOOKING_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly repo: SpaceBookingRepository,
    private readonly logRepo: BookingLogRepository,
    private readonly spaceRepo: FacilitySpaceRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(bookedBy: string, dto: CreateBookingDto) {
    const space = await this.spaceRepo.findById(dto.spaceId);
    if (!space) throw new ResourceNotFoundException('FacilitySpace', dto.spaceId);
    if (space.status !== SpaceStatus.AVAILABLE) {
      throw new BusinessRuleViolationException('Space is not available for booking');
    }

    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);
    if (endTime <= startTime) {
      throw new BusinessRuleViolationException('End time must be after start time');
    }
    if (startTime <= new Date()) {
      throw new BusinessRuleViolationException('Booking must start in the future');
    }

    const attendees = dto.attendees ?? 1;
    if (attendees > space.capacity) {
      throw new BusinessRuleViolationException(`Attendees (${attendees}) exceed space capacity (${space.capacity})`);
    }

    const conflicts = await this.repo.countConflicts(dto.spaceId, startTime, endTime);
    if (conflicts > 0) throw new BookingConflictException('Space has a conflicting booking for the requested time');

    const bookingNumber = `FBK-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const booking = await this.repo.create({
      bookingNumber,
      spaceId: dto.spaceId,
      bookedBy,
      purpose: dto.purpose,
      startTime,
      endTime,
      attendees,
      status: BookingStatus.PENDING,
    });

    await this.logRepo.create({ bookingId: booking.id, eventType: 'SUBMITTED', notes: null, recordedBy: bookedBy });
    await this.publisher.publishBookingSubmitted({
      bookingId: booking.id, bookingNumber, spaceId: dto.spaceId, bookedBy, startTime: dto.startTime, endTime: dto.endTime,
    });
    this.logger.log(`Booking submitted: ${bookingNumber}`);
    return this.repo.findById(booking.id);
  }

  async approve(id: string, reviewerId: string) {
    const booking = await this.findById(id);
    this.assertTransition(booking.status, BookingStatus.APPROVED);

    await this.repo.update(id, { status: BookingStatus.APPROVED, reviewerId });
    await this.logRepo.create({ bookingId: id, eventType: 'APPROVED', notes: null, recordedBy: reviewerId });
    await this.publisher.publishBookingApproved({
      bookingId: id, bookingNumber: booking.bookingNumber, reviewerId, spaceId: booking.spaceId,
    });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectBookingDto) {
    const booking = await this.findById(id);
    this.assertTransition(booking.status, BookingStatus.REJECTED);

    await this.repo.update(id, { status: BookingStatus.REJECTED, reviewerId, rejectionReason: dto.rejectionReason });
    await this.logRepo.create({ bookingId: id, eventType: 'REJECTED', notes: dto.rejectionReason, recordedBy: reviewerId });
    await this.publisher.publishBookingRejected({
      bookingId: id, bookingNumber: booking.bookingNumber, reason: dto.rejectionReason,
    });
    return this.repo.findById(id);
  }

  async activate(id: string, userId: string) {
    const booking = await this.findById(id);
    this.assertTransition(booking.status, BookingStatus.ACTIVE);

    await this.repo.update(id, { status: BookingStatus.ACTIVE });
    await this.logRepo.create({ bookingId: id, eventType: 'ACTIVE', notes: null, recordedBy: userId });
    return this.repo.findById(id);
  }

  async complete(id: string, userId: string) {
    const booking = await this.findById(id);
    this.assertTransition(booking.status, BookingStatus.COMPLETED);

    await this.repo.update(id, { status: BookingStatus.COMPLETED });
    await this.logRepo.create({ bookingId: id, eventType: 'COMPLETED', notes: null, recordedBy: userId });
    await this.publisher.publishBookingCompleted({
      bookingId: id, bookingNumber: booking.bookingNumber, spaceId: booking.spaceId,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const booking = await this.findById(id);
    if (!isStaff && booking.bookedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own bookings');
    }
    this.assertTransition(booking.status, BookingStatus.CANCELLED);

    await this.repo.update(id, { status: BookingStatus.CANCELLED });
    await this.logRepo.create({ bookingId: id, eventType: 'CANCELLED', notes: null, recordedBy: userId });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: BookingStatus; spaceId?: string; bookedBy?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.spaceId, filter.bookedBy);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new ResourceNotFoundException('SpaceBooking', id);
    return booking;
  }

  async findLogs(id: string) {
    await this.findById(id);
    return this.logRepo.findByBookingId(id);
  }

  private assertTransition(from: BookingStatus, to: BookingStatus) {
    const allowed = BOOKING_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
