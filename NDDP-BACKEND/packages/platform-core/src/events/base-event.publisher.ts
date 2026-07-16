import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { PlatformEventEnvelope } from '../interfaces';

@Injectable()
export abstract class BaseEventPublisher implements OnModuleInit, OnModuleDestroy {
  protected readonly logger = new Logger(this.constructor.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(protected readonly configService: ConfigService) {}

  protected abstract getSourceName(): string;

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.configService.get<string>('rabbitmq.url')!);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.configService.get<string>('rabbitmq.exchange')!, 'topic', { durable: true });
      this.logger.log('RabbitMQ connected');
    } catch (error) {
      this.logger.error(`RabbitMQ connection failed: ${(error as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  protected async publish(routingKey: string, data: Record<string, unknown>, correlationId?: string): Promise<void> {
    if (!this.channel) return;

    const payload: PlatformEventEnvelope = {
      eventId: uuidv4(),
      eventType: routingKey,
      timestamp: new Date().toISOString(),
      correlationId: correlationId || uuidv4(),
      source: this.getSourceName(),
      version: '1.0',
      data,
    };

    this.channel.publish(
      this.configService.get<string>('rabbitmq.exchange')!,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, contentType: 'application/json' },
    );
  }
}
