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
    return 'nddtp-inventory-service';
  }

  publishWarehouseCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.WAREHOUSE_CREATED, d, c);
  publishItemCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ITEM_CREATED, d, c);
  publishStockReceived = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.STOCK_RECEIVED, d, c);
  publishStockIssued = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.STOCK_ISSUED, d, c);
  publishStockAdjusted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.STOCK_ADJUSTED, d, c);
  publishRequestSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_SUBMITTED, d, c);
  publishRequestApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_APPROVED, d, c);
  publishRequestFulfilled = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_FULFILLED, d, c);
}
