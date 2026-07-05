import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEventPublisher } from '@nddtp/platform-core';
import { RABBITMQ_ROUTING_KEYS } from '../common/constants';

@Injectable()
export class EventPublisherService extends BaseEventPublisher {
  constructor(configService: ConfigService) {
    super(configService);
  }

  protected getSourceName(): string {
    return 'nddtp-training-service';
  }

  publishCourseCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.COURSE_CREATED, d, c);
  publishSessionScheduled = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.SESSION_SCHEDULED, d, c);
  publishEnrollmentSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ENROLLMENT_SUBMITTED, d, c);
  publishEnrollmentApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ENROLLMENT_APPROVED, d, c);
  publishEnrollmentRejected = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ENROLLMENT_REJECTED, d, c);
  publishEnrollmentCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ENROLLMENT_COMPLETED, d, c);
  publishAttendanceRecorded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ATTENDANCE_RECORDED, d, c);
  publishCertificationIssued = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CERTIFICATION_ISSUED, d, c);
}
