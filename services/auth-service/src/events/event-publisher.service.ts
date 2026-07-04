import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { AuthEventPayload } from '../common/interfaces';
import { RABBITMQ_ROUTING_KEYS } from '../common/constants';

@Injectable()
export class EventPublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EventPublisherService.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      const url = this.configService.get<string>('rabbitmq.url');
      this.connection = await amqp.connect(url!);
      this.channel = await this.connection.createChannel();

      const exchange = this.configService.get<string>('rabbitmq.exchange');
      const dlxExchange = this.configService.get<string>('rabbitmq.dlxExchange');

      await this.channel.assertExchange(exchange!, 'topic', { durable: true });
      await this.channel.assertExchange(dlxExchange!, 'topic', { durable: true });

      this.logger.log('RabbitMQ connection established');
    } catch (error) {
      this.logger.error(`Failed to connect to RabbitMQ: ${(error as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    this.logger.log('RabbitMQ connection closed');
  }

  async publish(
    routingKey: string,
    data: Record<string, unknown>,
    correlationId?: string,
  ): Promise<void> {
    if (!this.channel) {
      this.logger.warn('RabbitMQ channel not available, event not published');
      return;
    }

    const exchange = this.configService.get<string>('rabbitmq.exchange');

    const payload: AuthEventPayload = {
      eventId: uuidv4(),
      eventType: routingKey,
      timestamp: new Date().toISOString(),
      correlationId: correlationId || uuidv4(),
      source: this.configService.get<string>('app.name') || 'nddtp-auth-service',
      version: '1.0',
      data,
    };

    const buffer = Buffer.from(JSON.stringify(payload));

    this.channel.publish(exchange!, routingKey, buffer, {
      persistent: true,
      contentType: 'application/json',
      messageId: payload.eventId,
      correlationId: payload.correlationId,
      timestamp: Date.now(),
    });

    this.logger.debug(`Published event: ${routingKey}`);
  }

  async publishUserRegistered(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_REGISTERED, data, correlationId);
  }

  async publishLoginSuccess(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_LOGIN_SUCCESS, data, correlationId);
  }

  async publishLoginFailed(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_LOGIN_FAILED, data, correlationId);
  }

  async publishLogout(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_LOGOUT, data, correlationId);
  }

  async publishPasswordChanged(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_PASSWORD_CHANGED, data, correlationId);
  }

  async publishPasswordResetRequested(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(
      RABBITMQ_ROUTING_KEYS.USER_PASSWORD_RESET_REQUESTED,
      data,
      correlationId,
    );
  }

  async publishPasswordResetCompleted(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(
      RABBITMQ_ROUTING_KEYS.USER_PASSWORD_RESET_COMPLETED,
      data,
      correlationId,
    );
  }

  async publishMfaEnabled(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_MFA_ENABLED, data, correlationId);
  }

  async publishMfaDisabled(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_MFA_DISABLED, data, correlationId);
  }

  async publishAccountLocked(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_ACCOUNT_LOCKED, data, correlationId);
  }

  async publishSessionRevoked(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_SESSION_REVOKED, data, correlationId);
  }

  async publishTokenRefreshed(data: Record<string, unknown>, correlationId?: string) {
    await this.publish(RABBITMQ_ROUTING_KEYS.USER_TOKEN_REFRESHED, data, correlationId);
  }
}
