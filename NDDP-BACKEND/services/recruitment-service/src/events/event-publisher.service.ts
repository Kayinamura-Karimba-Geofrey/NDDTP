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
    return 'nddtp-recruitment-service';
  }

  publishPostingCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POSTING_CREATED, d, c);
  publishPostingPublished = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POSTING_PUBLISHED, d, c);
  publishPostingClosed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POSTING_CLOSED, d, c);
  publishApplicationSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPLICATION_SUBMITTED, d, c);
  publishApplicationStatusChanged = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPLICATION_STATUS_CHANGED, d, c);
  publishApplicationHired = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPLICATION_HIRED, d, c);
  publishInterviewScheduled = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.INTERVIEW_SCHEDULED, d, c);
  publishInterviewCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.INTERVIEW_COMPLETED, d, c);
}
