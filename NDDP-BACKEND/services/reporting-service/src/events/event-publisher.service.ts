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
    return 'nddtp-reporting-service';
  }

  publishDefinitionCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.DEFINITION_CREATED, d, c);
  publishRequestSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_SUBMITTED, d, c);
  publishRequestProcessing = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_PROCESSING, d, c);
  publishRequestCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_COMPLETED, d, c);
  publishRequestFailed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_FAILED, d, c);
  publishScheduleCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.SCHEDULE_CREATED, d, c);
}
