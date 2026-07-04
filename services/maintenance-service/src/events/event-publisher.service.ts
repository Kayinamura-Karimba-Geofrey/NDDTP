import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { RABBITMQ_ROUTING_KEYS } from '../common/constants';

@Injectable()
export class EventPublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EventPublisherService.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(private readonly cs: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.cs.get<string>('rabbitmq.url')!);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.cs.get<string>('rabbitmq.exchange')!, 'topic', { durable: true });
      this.logger.log('RabbitMQ connected');
    } catch (e) {
      this.logger.error(`RabbitMQ failed: ${(e as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async publish(routingKey: string, data: Record<string, unknown>, correlationId?: string) {
    if (!this.channel) return;
    const payload = {
      eventId: uuidv4(), eventType: routingKey, timestamp: new Date().toISOString(),
      correlationId: correlationId || uuidv4(), source: 'nddtp-maintenance-service', version: '1.0', data,
    };
    this.channel.publish(
      this.cs.get<string>('rabbitmq.exchange')!,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, contentType: 'application/json' },
    );
  }

  publishCategoryCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CATEGORY_CREATED, d, c);
  publishRequestSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_SUBMITTED, d, c);
  publishRequestApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_APPROVED, d, c);
  publishRequestRejected = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REQUEST_REJECTED, d, c);
  publishWorkOrderCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.WORKORDER_CREATED, d, c);
  publishWorkOrderStarted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.WORKORDER_STARTED, d, c);
  publishWorkOrderCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.WORKORDER_COMPLETED, d, c);
  publishTaskCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.TASK_COMPLETED, d, c);
}
