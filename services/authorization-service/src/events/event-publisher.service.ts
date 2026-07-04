import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { AuthzEventPayload } from '../common/interfaces';
import { RABBITMQ_ROUTING_KEYS } from '../common/constants';

@Injectable()
export class EventPublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EventPublisherService.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.configService.get<string>('rabbitmq.url')!);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.configService.get<string>('rabbitmq.exchange')!, 'topic', { durable: true });
      this.logger.log('RabbitMQ publisher connected');
    } catch (e) {
      this.logger.error(`RabbitMQ connect failed: ${(e as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async publish(routingKey: string, data: Record<string, unknown>, correlationId?: string) {
    if (!this.channel) return;
    const payload: AuthzEventPayload = {
      eventId: uuidv4(),
      eventType: routingKey,
      timestamp: new Date().toISOString(),
      correlationId: correlationId || uuidv4(),
      source: this.configService.get<string>('app.name') || 'nddtp-authorization-service',
      version: '1.0',
      data,
    };
    this.channel.publish(
      this.configService.get<string>('rabbitmq.exchange')!,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, contentType: 'application/json', messageId: payload.eventId },
    );
  }

  publishRoleCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ROLE_CREATED, d, c);
  publishRoleUpdated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ROLE_UPDATED, d, c);
  publishRoleDeleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ROLE_DELETED, d, c);
  publishPermissionCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PERMISSION_CREATED, d, c);
  publishPermissionUpdated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PERMISSION_UPDATED, d, c);
  publishPermissionDeleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PERMISSION_DELETED, d, c);
  publishRoleAssigned = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ROLE_ASSIGNED, d, c);
  publishRoleRevoked = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ROLE_REVOKED, d, c);
  publishPermissionGranted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PERMISSION_GRANTED, d, c);
  publishPermissionRevoked = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PERMISSION_REVOKED, d, c);
  publishAccessDenied = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ACCESS_DENIED, d, c);
  publishAccessGranted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.ACCESS_GRANTED, d, c);
}
