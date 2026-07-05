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
    return 'nddtp-announcement-service';
  }

  publishCategoryCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CATEGORY_CREATED, d, c);
  publishCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CREATED, d, c);
  publishPublished = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PUBLISHED, d, c);
  publishWithdrawn = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.WITHDRAWN, d, c);
  publishAcknowledged = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ACKNOWLEDGED, d, c);
}
