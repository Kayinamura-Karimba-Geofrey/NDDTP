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
    return 'nddtp-analytics-service';
  }

  publishMetricCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.METRIC_CREATED, d, c);
  publishSnapshotRecorded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.SNAPSHOT_RECORDED, d, c);
  publishDashboardCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.DASHBOARD_CREATED, d, c);
  publishQuerySubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.QUERY_SUBMITTED, d, c);
  publishQueryProcessing = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.QUERY_PROCESSING, d, c);
  publishQueryCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.QUERY_COMPLETED, d, c);
  publishQueryFailed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.QUERY_FAILED, d, c);
}
