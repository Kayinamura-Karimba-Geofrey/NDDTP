import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUES } from '../common/constants';
import { PlatformEventPayload } from '@nddtp/platform-core';
import { PersonnelService } from '../modules/personnel/personnel.service';

const USER_BINDINGS = ['user.user.created', 'user.user.updated', 'user.user.deactivated', 'user.user.deleted'];

@Injectable()
export class UserEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UserEventConsumer.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly cs: ConfigService,
    private readonly personnelService: PersonnelService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.cs.get<string>('rabbitmq.url')!);
      this.channel = await this.connection.createChannel();
      const exchange = this.cs.get<string>('rabbitmq.exchange')!;
      const dlx = this.cs.get<string>('rabbitmq.dlxExchange')!;

      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      await this.channel.assertExchange(dlx, 'topic', { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.USER_EVENTS_DLQ, { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.USER_EVENTS, {
        durable: true,
        deadLetterExchange: dlx,
        deadLetterRoutingKey: 'personnel-service.user.events.dlq',
      });

      for (const key of USER_BINDINGS) {
        await this.channel.bindQueue(RABBITMQ_QUEUES.USER_EVENTS, exchange, key);
      }

      await this.channel.prefetch(10);
      await this.channel.consume(RABBITMQ_QUEUES.USER_EVENTS, async (msg) => {
        if (!msg) return;
        try {
          const content = JSON.parse(msg.content.toString()) as PlatformEventPayload;
          await this.handleEvent(content);
          this.channel!.ack(msg);
        } catch (e) {
          this.logger.error(`User event failed: ${(e as Error).message}`);
          this.channel!.nack(msg, false, false);
        }
      });

      this.logger.log('User event consumer started');
    } catch (e) {
      this.logger.error(`Consumer init failed: ${(e as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async handleEvent(event: PlatformEventPayload): Promise<void> {
    switch (event.eventType) {
      case 'user.user.created':
        await this.personnelService.createFromUserEvent(event.data, event.correlationId);
        break;
      case 'user.user.updated':
        await this.personnelService.syncFromUserEvent(event.data);
        break;
      case 'user.user.deactivated':
        await this.personnelService.deactivateFromUserEvent(event.data.userId as string);
        break;
      case 'user.user.deleted':
        await this.personnelService.deleteFromUserEvent(event.data.userId as string);
        break;
    }
    this.logger.debug(`Processed ${event.eventType}`);
  }
}
