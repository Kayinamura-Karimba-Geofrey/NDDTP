import { Injectable, Logger } from '@nestjs/common';
import { AttendanceRepository } from './repositories/attendance.repository';
import { EnrollmentRepository } from '../enrollments/repositories/enrollment.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/training.exceptions';
import { RecordAttendanceDto } from './dto/attendance.dto';
import { EnrollmentStatus } from '../../common/enums';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(
    private readonly repo: AttendanceRepository,
    private readonly enrollmentRepo: EnrollmentRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async record(recordedBy: string, dto: RecordAttendanceDto) {
    const enrollment = await this.enrollmentRepo.findById(dto.enrollmentId);
    if (!enrollment) throw new ResourceNotFoundException('TrainingEnrollment', dto.enrollmentId);

    const activeStatuses = [EnrollmentStatus.ENROLLED, EnrollmentStatus.IN_PROGRESS, EnrollmentStatus.COMPLETED];
    if (!activeStatuses.includes(enrollment.status)) {
      throw new BusinessRuleViolationException('Attendance can only be recorded for active enrollments');
    }

    const existing = await this.repo.findByEnrollmentAndDate(dto.enrollmentId, dto.attendanceDate);
    if (existing) throw new BusinessRuleViolationException('Attendance already recorded for this date');

    const attendance = await this.repo.create({
      enrollmentId: dto.enrollmentId,
      attendanceDate: dto.attendanceDate,
      status: dto.status,
      notes: dto.notes ?? null,
      recordedBy,
    });

    await this.publisher.publishAttendanceRecorded({
      attendanceId: attendance.id, enrollmentId: dto.enrollmentId, userId: enrollment.userId,
      attendanceDate: dto.attendanceDate, status: dto.status,
    });

    this.logger.log(`Attendance recorded for enrollment ${dto.enrollmentId}`);
    return attendance;
  }

  async findByEnrollment(enrollmentId: string) {
    const enrollment = await this.enrollmentRepo.findById(enrollmentId);
    if (!enrollment) throw new ResourceNotFoundException('TrainingEnrollment', enrollmentId);
    return this.repo.findByEnrollment(enrollmentId);
  }
}
