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
    return 'nddtp-asset-service';
  }

  publishCategoryCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CATEGORY_CREATED, d, c);
  publishAssetRegistered = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSET_REGISTERED, d, c);
  publishAssetAssigned = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSET_ASSIGNED, d, c);
  publishAssetReturned = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSET_RETURNED, d, c);
  publishAssetTransferred = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSET_TRANSFERRED, d, c);
  publishAssetDisposed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ASSET_DISPOSED, d, c);
  publishAuditCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.AUDIT_COMPLETED, d, c);
}
