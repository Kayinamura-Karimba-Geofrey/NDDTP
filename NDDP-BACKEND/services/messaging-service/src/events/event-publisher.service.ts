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
    return 'nddtp-messaging-service';
  }

  publishChannelCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CHANNEL_CREATED, d, c);
  publishMemberAdded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MEMBER_ADDED, d, c);
  publishMessageSent = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MESSAGE_SENT, d, c);
  publishMessageDelivered = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MESSAGE_DELIVERED, d, c);
  publishMessageRead = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MESSAGE_READ, d, c);
}
