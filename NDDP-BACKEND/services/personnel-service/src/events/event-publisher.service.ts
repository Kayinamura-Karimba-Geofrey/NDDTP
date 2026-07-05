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
    return 'nddtp-personnel-service';
  }

  publishRecordCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RECORD_CREATED, d, c);
  publishRecordUpdated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RECORD_UPDATED, d, c);
  publishRecordSeparated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RECORD_SEPARATED, d, c);
  publishRankPromoted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RANK_PROMOTED, d, c);
  publishAssignmentCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSIGNMENT_CREATED, d, c);
  publishAssignmentEnded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSIGNMENT_ENDED, d, c);
  publishQualificationAdded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.QUALIFICATION_ADDED, d, c);
  publishServiceEventRecorded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.SERVICE_EVENT_RECORDED, d, c);
}
