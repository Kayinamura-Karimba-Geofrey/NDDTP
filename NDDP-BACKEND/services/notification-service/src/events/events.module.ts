import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventPublisherService } from './event-publisher.service';
import { PlatformEventConsumer } from '../queues/platform-event.consumer';
import { NotificationModule } from '../modules/notifications/notification.module';

@Module({
  imports: [ConfigModule, forwardRef(() => NotificationModule)],
  providers: [EventPublisherService, PlatformEventConsumer],
  exports: [EventPublisherService],
})
export class EventsModule {}
