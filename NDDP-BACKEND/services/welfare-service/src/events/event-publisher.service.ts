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
    return 'nddtp-welfare-service';
  }

  publishProgramCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PROGRAM_CREATED, d, c);
  publishDependentRegistered = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.DEPENDENT_REGISTERED, d, c);
  publishClaimSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CLAIM_SUBMITTED, d, c);
  publishClaimApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CLAIM_APPROVED, d, c);
  publishClaimRejected = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CLAIM_REJECTED, d, c);
  publishClaimDisbursed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CLAIM_DISBURSED, d, c);
}
