import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUES } from '../common/constants';
import { PlatformEventPayload } from '@nddtp/platform-core';
import { AuditLogService } from '../modules/audit/audit-log.service';
import { SecurityEventService } from '../modules/audit/security-event.service';
import { EventMapperService } from '../modules/audit/event-mapper.service';
import { AuditSeverity } from '../common/enums';

const PLATFORM_BINDINGS = ['auth.#', 'user.#', 'authorization.#', 'notification.#', '#'];

@Injectable()
export class PlatformEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PlatformEventConsumer.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly cs: ConfigService,
    private readonly auditLogService: AuditLogService,
    private readonly securityEventService: SecurityEventService,
    private readonly eventMapper: EventMapperService,
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
        deadLetterRoutingKey: 'audit-service.platform.events.dlq',
      });

      for (const key of PLATFORM_BINDINGS) {
        await this.channel.bindQueue(RABBITMQ_QUEUES.PLATFORM_EVENTS, exchange, key);
      }

      await this.channel.prefetch(10);
      await this.channel.consume(RABBITMQ_QUEUES.PLATFORM_EVENTS, async (msg) => {
        if (!msg) return;
        try {
          const content = JSON.parse(msg.content.toString()) as PlatformEventPayload;
          await this.handleEvent(content);
          this.channel!.ack(msg);
        } catch (e) {
          this.logger.error(`Event processing failed: ${(e as Error).message}`);
          this.channel!.nack(msg, false, false);
        }
      });

      this.logger.log('Platform event consumer started (auth.#, user.#, authorization.#, notification.#)');
    } catch (e) {
      this.logger.error(`Consumer init failed: ${(e as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async handleEvent(event: PlatformEventPayload): Promise<void> {
    if (event.eventType.startsWith('audit.')) return;

    const auditInput = this.eventMapper.mapPlatformEvent(event);
    await this.auditLogService.create(auditInput);

    if (this.eventMapper.isSecurityEvent(event.eventType)) {
      await this.securityEventService.create({
        eventId: event.eventId,
        eventType: this.eventMapper.mapSecurityEventType(event.eventType),
        severity: auditInput.severity as AuditSeverity,
        userId: auditInput.userId,
        actorEmail: auditInput.actorEmail,
        sourceEvent: event.eventType,
        ipAddress: auditInput.ipAddress,
        userAgent: auditInput.userAgent,
        correlationId: event.correlationId,
        description: auditInput.description || event.eventType,
        metadata: event.data,
      });
    }

    this.logger.debug(`Recorded audit for ${event.eventType}`);
  }
}
