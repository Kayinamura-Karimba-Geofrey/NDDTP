import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventPublisherService } from './event-publisher.service';
import { PlatformEventConsumer } from '../queues/platform-event.consumer';
import { AuditModule } from '../modules/audit/audit.module';

@Module({
  imports: [ConfigModule, forwardRef(() => AuditModule)],
  providers: [EventPublisherService, PlatformEventConsumer],
  exports: [EventPublisherService],
})
export class EventsModule {}
