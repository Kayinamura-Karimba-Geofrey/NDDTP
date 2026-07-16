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
    return 'nddtp-fleet-service';
  }

  publishTypeCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.TYPE_CREATED, d, c);
  publishVehicleRegistered = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.VEHICLE_REGISTERED, d, c);
  publishVehicleAssigned = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.VEHICLE_ASSIGNED, d, c);
  publishVehicleReturned = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.VEHICLE_RETURNED, d, c);
  publishTripLogged = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.TRIP_LOGGED, d, c);
  publishInspectionCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.INSPECTION_COMPLETED, d, c);
}
