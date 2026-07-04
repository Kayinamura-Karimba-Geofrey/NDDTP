import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppointmentRepository } from './repositories/appointment.repository';
import { FacilityRepository } from '../facilities/repositories/facility.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/medical.exceptions';
import { CreateAppointmentDto, CancelAppointmentDto } from './dto/appointment.dto';
import { AppointmentStatus, FacilityStatus } from '../../common/enums';
import { APPOINTMENT_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);

  constructor(
    private readonly repo: AppointmentRepository,
    private readonly facilityRepo: FacilityRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateAppointmentDto) {
    const facility = await this.facilityRepo.findById(dto.facilityId);
    if (!facility) throw new ResourceNotFoundException('MedicalFacility', dto.facilityId);
    if (facility.status !== FacilityStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Facility is not accepting appointments');
    }

    const scheduledAt = new Date(dto.scheduledAt);
    if (scheduledAt <= new Date()) {
      throw new BusinessRuleViolationException('Appointment must be scheduled in the future');
    }

    const count = await this.repo.countByFacilityAndDate(dto.facilityId, scheduledAt);
    if (facility.capacity > 0 && count >= facility.capacity) {
      throw new BusinessRuleViolationException('Facility is at capacity for the selected date');
    }

    const appointmentNumber = `MAP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const appointment = await this.repo.create({
      appointmentNumber,
      userId,
      facilityId: dto.facilityId,
      type: dto.type,
      scheduledAt,
      reason: dto.reason,
      notes: dto.notes ?? null,
      status: AppointmentStatus.SCHEDULED,
    });

    await this.publisher.publishAppointmentScheduled({
      appointmentId: appointment.id, appointmentNumber, userId, facilityId: dto.facilityId,
      scheduledAt: dto.scheduledAt, type: dto.type,
    });

    this.logger.log(`Appointment ${appointmentNumber} scheduled`);
    return this.repo.findById(appointment.id);
  }

  async confirm(id: string, providerId: string) {
    const appointment = await this.findById(id);
    this.assertTransition(appointment.status, AppointmentStatus.CONFIRMED);

    await this.repo.update(id, { status: AppointmentStatus.CONFIRMED, providerId });
    await this.publisher.publishAppointmentConfirmed({
      appointmentId: id, appointmentNumber: appointment.appointmentNumber, userId: appointment.userId, providerId,
    });
    return this.repo.findById(id);
  }

  async start(id: string, providerId: string) {
    const appointment = await this.findById(id);
    this.assertTransition(appointment.status, AppointmentStatus.IN_PROGRESS);

    await this.repo.update(id, { status: AppointmentStatus.IN_PROGRESS, providerId });
    return this.repo.findById(id);
  }

  async complete(id: string, providerId: string) {
    const appointment = await this.findById(id);
    this.assertTransition(appointment.status, AppointmentStatus.COMPLETED);

    await this.repo.update(id, { status: AppointmentStatus.COMPLETED, completedAt: new Date(), providerId });
    await this.publisher.publishAppointmentCompleted({
      appointmentId: id, appointmentNumber: appointment.appointmentNumber, userId: appointment.userId, providerId,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, dto: CancelAppointmentDto, isStaff = false) {
    const appointment = await this.findById(id);
    if (!isStaff && appointment.userId !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own appointments');
    }
    const cancellable = [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED];
    if (!cancellable.includes(appointment.status)) {
      throw new BusinessRuleViolationException('This appointment cannot be cancelled');
    }

    await this.repo.update(id, { status: AppointmentStatus.CANCELLED, cancelledReason: dto.reason });
    await this.publisher.publishAppointmentCancelled({
      appointmentId: id, appointmentNumber: appointment.appointmentNumber, userId: appointment.userId, reason: dto.reason,
    });
    return this.repo.findById(id);
  }

  async markNoShow(id: string) {
    const appointment = await this.findById(id);
    this.assertTransition(appointment.status, AppointmentStatus.NO_SHOW);
    await this.repo.update(id, { status: AppointmentStatus.NO_SHOW });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: AppointmentStatus; userId?: string; facilityId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.userId, filter.facilityId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findById(id: string) {
    const appointment = await this.repo.findById(id);
    if (!appointment) throw new ResourceNotFoundException('MedicalAppointment', id);
    return appointment;
  }

  private assertTransition(from: AppointmentStatus, to: AppointmentStatus) {
    const allowed = APPOINTMENT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
