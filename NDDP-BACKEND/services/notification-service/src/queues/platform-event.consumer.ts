import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUES, EVENT_TEMPLATE_MAP } from '../common/constants';
import { NotificationService } from '../modules/notifications/notification.service';
import { NotificationChannel } from '../common/enums';

@Injectable()
export class PlatformEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PlatformEventConsumer.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly cs: ConfigService,
    private readonly notificationService: NotificationService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.cs.get<string>('rabbitmq.url')!);
      this.channel = await this.connection.createChannel();
      const exchange = this.cs.get<string>('rabbitmq.exchange')!;
      const dlx = this.cs.get<string>('rabbitmq.dlxExchange')!;

      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      await this.channel.assertExchange(dlx, 'topic', { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.PLATFORM_EVENTS_DLQ, { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.PLATFORM_EVENTS, {
        durable: true,
        deadLetterExchange: dlx,
        deadLetterRoutingKey: 'notification-service.platform.events.dlq',
      });

      const bindings = Object.keys(EVENT_TEMPLATE_MAP);
      for (const key of bindings) {
        await this.channel.bindQueue(RABBITMQ_QUEUES.PLATFORM_EVENTS, exchange, key);
      }

      await this.channel.prefetch(10);
      await this.channel.consume(RABBITMQ_QUEUES.PLATFORM_EVENTS, async (msg) => {
        if (!msg) return;
        try {
          const content = JSON.parse(msg.content.toString());
          await this.handleEvent(content.eventType, content.data, content.correlationId);
          this.channel!.ack(msg);
        } catch (e) {
          this.logger.error(`Event processing failed: ${(e as Error).message}`);
          this.channel!.nack(msg, false, false);
        }
      });

      this.logger.log('Platform event consumer started');
    } catch (e) {
      this.logger.error(`Consumer init failed: ${(e as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async handleEvent(eventType: string, data: Record<string, unknown>, correlationId?: string) {
    const mapping = EVENT_TEMPLATE_MAP[eventType];
    if (!mapping) return;

    const variables: Record<string, string> = {};
    if (data.firstName) variables.firstName = String(data.firstName);
    if (data.lastName) variables.lastName = String(data.lastName);
    if (data.resetToken) variables.resetToken = String(data.resetToken);
    if (data.resetLink) variables.resetLink = String(data.resetLink || `https://nddtp.defence.gov/reset?token=${data.resetToken}`);
    if (data.roleCode) variables.roleCode = String(data.roleCode);
    if (data.lockedUntil) variables.lockedUntil = String(data.lockedUntil);
    if (data.email) variables.email = String(data.email);

    await this.notificationService.sendFromEvent({
      userId: data.userId as string,
      templateCode: mapping.templateCode,
      channel: mapping.channel,
      recipientEmail: data.email as string | undefined,
      variables,
    }, correlationId);

    this.logger.log(`Processed event ${eventType} for user ${data.userId}`);
  }
}
