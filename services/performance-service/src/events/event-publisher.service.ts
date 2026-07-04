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
      correlationId: correlationId || uuidv4(), source: 'nddtp-performance-service', version: '1.0', data,
    };
    this.channel.publish(
      this.cs.get<string>('rabbitmq.exchange')!,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, contentType: 'application/json' },
    );
  }

  publishCycleCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.CYCLE_CREATED, d, c);
  publishGoalCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.GOAL_CREATED, d, c);
  publishGoalCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.GOAL_COMPLETED, d, c);
  publishReviewSubmitted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REVIEW_SUBMITTED, d, c);
  publishReviewApproved = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REVIEW_APPROVED, d, c);
  publishReviewFinalized = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.REVIEW_FINALIZED, d, c);
  publishPlanCreated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PLAN_CREATED, d, c);
  publishPlanActivated = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PLAN_ACTIVATED, d, c);
  publishPlanCompleted = (d: Record<string, unknown>, c?: string) => this.publish(RABBITMQ_ROUTING_KEYS.PLAN_COMPLETED, d, c);
}
