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
    return 'nddtp-business-intelligence-service';
  }

  publishDatasetCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.DATASET_CREATED, d, c);
  publishModelCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.MODEL_CREATED, d, c);
  publishReportCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REPORT_CREATED, d, c);
  publishExecutionSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXECUTION_SUBMITTED, d, c);
  publishExecutionProcessing = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXECUTION_PROCESSING, d, c);
  publishExecutionCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXECUTION_COMPLETED, d, c);
  publishExecutionFailed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXECUTION_FAILED, d, c);
}
