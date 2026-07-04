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
      correlationId: correlationId || uuidv4(), source: 'nddtp-recruitment-service', version: '1.0', data,
    };
    this.channel.publish(
      this.cs.get<string>('rabbitmq.exchange')!,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, contentType: 'application/json' },
    );
  }

  publishPostingCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POSTING_CREATED, d, c);
  publishPostingPublished = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POSTING_PUBLISHED, d, c);
  publishPostingClosed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POSTING_CLOSED, d, c);
  publishApplicationSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPLICATION_SUBMITTED, d, c);
  publishApplicationStatusChanged = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPLICATION_STATUS_CHANGED, d, c);
  publishApplicationHired = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.APPLICATION_HIRED, d, c);
  publishInterviewScheduled = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.INTERVIEW_SCHEDULED, d, c);
  publishInterviewCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.INTERVIEW_COMPLETED, d, c);
}
