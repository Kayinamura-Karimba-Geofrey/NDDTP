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
      correlationId: correlationId || uuidv4(), source: 'nddtp-backup-service', version: '1.0', data,
    };
    this.channel.publish(
      this.cs.get<string>('rabbitmq.exchange')!,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, contentType: 'application/json' },
    );
  }

  publishPolicyCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.POLICY_CREATED, d, c);
  publishJobSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.JOB_SUBMITTED, d, c);
  publishJobCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.JOB_COMPLETED, d, c);
  publishJobFailed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.JOB_FAILED, d, c);
  publishRestoreSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RESTORE_SUBMITTED, d, c);
  publishRestoreCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RESTORE_COMPLETED, d, c);
  publishRestoreFailed = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.RESTORE_FAILED, d, c);
}
