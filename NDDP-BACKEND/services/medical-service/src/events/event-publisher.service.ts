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
    return 'nddtp-medical-service';
  }

  publishFacilityCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.FACILITY_CREATED, d, c);
  publishAppointmentScheduled = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPOINTMENT_SCHEDULED, d, c);
  publishAppointmentConfirmed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPOINTMENT_CONFIRMED, d, c);
  publishAppointmentCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPOINTMENT_COMPLETED, d, c);
  publishAppointmentCancelled = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPOINTMENT_CANCELLED, d, c);
  publishRecordCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RECORD_CREATED, d, c);
  publishFitnessAssessed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.FITNESS_ASSESSED, d, c);
  publishCertificateIssued = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CERTIFICATE_ISSUED, d, c);
  publishCertificateRevoked = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CERTIFICATE_REVOKED, d, c);
}
