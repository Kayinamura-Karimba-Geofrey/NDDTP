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
    return 'nddtp-ai-assistant-service';
  }

  publishAgentCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.AGENT_CREATED, d, c);
  publishConversationCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CONVERSATION_CREATED, d, c);
  publishMessageSent = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MESSAGE_SENT, d, c);
  publishMessageCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MESSAGE_COMPLETED, d, c);
  publishMessageFailed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MESSAGE_FAILED, d, c);
}
