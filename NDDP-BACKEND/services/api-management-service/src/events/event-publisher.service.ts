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
    return 'nddtp-api-management-service';
  }

  publishProductCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PRODUCT_CREATED, d, c);
  publishRouteCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ROUTE_CREATED, d, c);
  publishConsumerCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CONSUMER_CREATED, d, c);
  publishKeyIssued = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.KEY_ISSUED, d, c);
  publishKeyRevoked = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.KEY_REVOKED, d, c);
}
