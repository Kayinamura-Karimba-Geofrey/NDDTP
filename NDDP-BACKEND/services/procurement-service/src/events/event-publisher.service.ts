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
    return 'nddtp-procurement-service';
  }

  publishVendorCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.VENDOR_CREATED, d, c);
  publishRequisitionSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUISITION_SUBMITTED, d, c);
  publishRequisitionApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUISITION_APPROVED, d, c);
  publishRequisitionRejected = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUISITION_REJECTED, d, c);
  publishOrderCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ORDER_CREATED, d, c);
  publishOrderIssued = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ORDER_ISSUED, d, c);
  publishReceiptRecorded = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RECEIPT_RECORDED, d, c);
}
