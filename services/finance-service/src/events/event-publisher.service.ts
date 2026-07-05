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
    return 'nddtp-finance-service';
  }

  publishCategoryCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CATEGORY_CREATED, d, c);
  publishAccountCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ACCOUNT_CREATED, d, c);
  publishBudgetAllocated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.BUDGET_ALLOCATED, d, c);
  publishExpenditureSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXPENDITURE_SUBMITTED, d, c);
  publishExpenditureApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXPENDITURE_APPROVED, d, c);
  publishExpenditureRejected = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXPENDITURE_REJECTED, d, c);
  publishExpenditurePaid = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.EXPENDITURE_PAID, d, c);
}
