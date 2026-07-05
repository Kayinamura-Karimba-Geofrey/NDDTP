import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventPublisherService } from './event-publisher.service';
import { UserEventConsumer } from '../queues/user-event.consumer';
import { PersonnelModule } from '../modules/personnel/personnel.module';

@Module({
  imports: [ConfigModule, forwardRef(() => PersonnelModule)],
  providers: [EventPublisherService, UserEventConsumer],
  exports: [EventPublisherService],
})
export class EventsModule {}
