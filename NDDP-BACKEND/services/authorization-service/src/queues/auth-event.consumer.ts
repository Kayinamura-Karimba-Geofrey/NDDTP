import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUES } from '../common/constants';
import { ConsumedEventType } from '../common/enums';
import { AssignmentService } from '../modules/assignments/assignment.service';

@Injectable()
export class AuthEventConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AuthEventConsumer.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly assignmentService: AssignmentService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const url = this.configService.get<string>('rabbitmq.url');
      this.connection = await amqp.connect(url!);
      this.channel = await this.connection.createChannel();

      const exchange = this.configService.get<string>('rabbitmq.exchange')!;
      const dlx = this.configService.get<string>('rabbitmq.dlxExchange')!;
      const prefix = this.configService.get<string>('rabbitmq.queuePrefix')!;

      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      await this.channel.assertExchange(dlx, 'topic', { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.AUTH_EVENTS_DLQ, { durable: true });
      await this.channel.assertQueue(RABBITMQ_QUEUES.AUTH_EVENTS, {
        durable: true,
        deadLetterExchange: dlx,
        deadLetterRoutingKey: `${prefix}.auth.events.dlq`,
      });

      await this.channel.bindQueue(RABBITMQ_QUEUES.AUTH_EVENTS, exchange, 'auth.user.registered');
      await this.channel.bindQueue(RABBITMQ_QUEUES.AUTH_EVENTS, exchange, 'user.user.deleted');
      await this.channel.bindQueue(RABBITMQ_QUEUES.AUTH_EVENTS, exchange, 'user.user.deactivated');

      await this.channel.prefetch(10);
      await this.channel.consume(RABBITMQ_QUEUES.AUTH_EVENTS, async (msg) => {
        if (!msg) return;
        try {
          const content = JSON.parse(msg.content.toString());
          await this.handle(content.eventType, content.data, content.correlationId);
          this.channel!.ack(msg);
        } catch (e) {
          this.logger.error(`Event processing failed: ${(e as Error).message}`);
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

  private async handle(eventType: string, data: Record<string, unknown>, correlationId?: string) {
    switch (eventType) {
      case ConsumedEventType.USER_REGISTERED:
        await this.assignmentService.assignDefaultRole(data.userId as string, correlationId);
        this.logger.log(`Default role assigned to user ${data.userId}`);
        break;
      case ConsumedEventType.USER_DELETED:
      case ConsumedEventType.USER_DEACTIVATED:
        await this.assignmentService.revokeAllUserRoles(
          data.userId as string,
          'system',
          eventType,
          correlationId,
        );
        break;
    }
  }
}
