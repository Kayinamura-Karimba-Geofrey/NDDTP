import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionAttendance } from '../../../database/entities/session-attendance.entity';

@Injectable()
export class AttendanceRepository {
  constructor(@InjectRepository(SessionAttendance) private readonly repo: Repository<SessionAttendance>) {}

  create(data: Partial<SessionAttendance>) { return this.repo.save(this.repo.create(data)); }

  findByEnrollment(enrollmentId: string) {
    return this.repo.find({ where: { enrollmentId }, order: { attendanceDate: 'ASC' } });
  }

  findByEnrollmentAndDate(enrollmentId: string, date: string) {
    return this.repo.findOne({ where: { enrollmentId, attendanceDate: date } });
  }
}
