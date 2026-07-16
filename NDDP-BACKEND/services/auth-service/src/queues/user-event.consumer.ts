import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUES } from '../common/constants';
import { ConsumedEventType } from '../common/enums';
import { AuthCredentialRepository } from '../modules/credentials/repositories/auth-credential.repository';
import { AccountStatus } from '../common/enums';

@Injectable()
export class UserEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UserEventConsumer.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly credentialRepository: AuthCredentialRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const url = this.configService.get<string>('rabbitmq.url');
      this.connection = await amqp.connect(url!);
      this.channel = await this.connection.createChannel();

      const exchange = this.configService.get<string>('rabbitmq.exchange');
      const dlxExchange = this.configService.get<string>('rabbitmq.dlxExchange');
      const queuePrefix = this.configService.get<string>('rabbitmq.queuePrefix');

      await this.channel.assertExchange(exchange!, 'topic', { durable: true });
      await this.channel.assertExchange(dlxExchange!, 'topic', { durable: true });

      const queueName = RABBITMQ_QUEUES.USER_EVENTS;
      const dlqName = RABBITMQ_QUEUES.USER_EVENTS_DLQ;

      await this.channel.assertQueue(dlqName, { durable: true });
      await this.channel.assertQueue(queueName, {
        durable: true,
        deadLetterExchange: dlxExchange!,
        deadLetterRoutingKey: `${queuePrefix}.user.events.dlq`,
      });

      await this.channel.bindQueue(queueName, exchange!, 'user.user.created');
      await this.channel.bindQueue(queueName, exchange!, 'user.user.updated');
      await this.channel.bindQueue(queueName, exchange!, 'user.user.deactivated');
      await this.channel.bindQueue(queueName, exchange!, 'user.user.deleted');

      await this.channel.prefetch(10);

      await this.channel.consume(queueName, async (msg) => {
        if (!msg) return;

        try {
          const content = JSON.parse(msg.content.toString());
          await this.handleMessage(content.eventType, content.data);
          this.channel!.ack(msg);
        } catch (error) {
          this.logger.error(`Failed to process message: ${(error as Error).message}`);
          this.channel!.nack(msg, false, false);
        }
      });

      this.logger.log('User event consumer started');
    } catch (error) {
      this.logger.error(`Failed to start consumer: ${(error as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  private async handleMessage(eventType: string, data: Record<string, unknown>): Promise<void> {
    switch (eventType) {
      case ConsumedEventType.USER_DEACTIVATED:
        await this.handleUserDeactivated(data);
        break;
      case ConsumedEventType.USER_DELETED:
        await this.handleUserDeleted(data);
        break;
      case ConsumedEventType.USER_UPDATED:
        await this.handleUserUpdated(data);
        break;
      default:
        this.logger.debug(`Unhandled event type: ${eventType}`);
    }
  }

  private async handleUserDeactivated(data: Record<string, unknown>): Promise<void> {
    const userId = data.userId as string;
    const credential = await this.credentialRepository.findByUserId(userId);
    if (credential) {
      await this.credentialRepository.updateStatus(credential.id, AccountStatus.INACTIVE);
      this.logger.log(`Deactivated credentials for user ${userId}`);
    }
  }

  private async handleUserDeleted(data: Record<string, unknown>): Promise<void> {
    const userId = data.userId as string;
    const credential = await this.credentialRepository.findByUserId(userId);
    if (credential) {
      await this.credentialRepository.softDelete(credential.id);
      this.logger.log(`Soft-deleted credentials for user ${userId}`);
    }
  }

  private async handleUserUpdated(data: Record<string, unknown>): Promise<void> {
    const userId = data.userId as string;
    const email = data.email as string | undefined;
    if (email) {
      const credential = await this.credentialRepository.findByUserId(userId);
      if (credential && credential.email !== email) {
        await this.credentialRepository.updateEmail(credential.id, email);
        this.logger.log(`Updated email for user ${userId}`);
      }
    }
  }
}
