import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUES } from '../common/constants';
import { ConsumedEventType } from '../common/enums';
import { UserRepository } from '../modules/users/repositories/user.repository';

@Injectable()
export class AuthEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AuthEventConsumer.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(private readonly cs: ConfigService, private readonly userRepo: UserRepository) {}

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.cs.get<string>('rabbitmq.url')!);
      this.channel = await this.connection.createChannel();
      const exchange = this.cs.get<string>('rabbitmq.exchange')!;
      const dlx = this.cs.get<string>('rabbitmq.dlxExchange')!;
      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      await this.channel.assertExchange(dlx, 'topic', { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.AUTH_EVENTS_DLQ, { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.AUTH_EVENTS, {
        durable: true, deadLetterExchange: dlx, deadLetterRoutingKey: 'user-service.auth.events.dlq',
      });
      await this.channel.bindQueue(RABBITMQ_QUEUES.AUTH_EVENTS, exchange, 'auth.user.registered');
      await this.channel.consume(RABBITMQ_QUEUES.AUTH_EVENTS, async (msg) => {
        if (!msg) return;
        try {
          const content = JSON.parse(msg.content.toString());
          if (content.eventType === ConsumedEventType.AUTH_USER_REGISTERED) {
            await this.userRepo.markCredentialsRegistered(content.data.userId as string);
            this.logger.log(`Credentials registered for user ${content.data.userId}`);
          }
          this.channel!.ack(msg);
        } catch (e) {
          this.logger.error(`Event error: ${(e as Error).message}`);
          this.channel!.nack(msg, false, false);
        }
      });
      this.logger.log('Auth event consumer started');
    } catch (e) {
      this.logger.error(`Consumer init failed: ${(e as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}
