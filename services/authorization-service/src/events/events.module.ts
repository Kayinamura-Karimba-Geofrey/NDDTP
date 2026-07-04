import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventPublisherService } from './event-publisher.service';
import { AuthEventConsumer } from '../queues/auth-event.consumer';
import { AssignmentModule } from '../modules/assignments/assignment.module';

@Module({
  imports: [ConfigModule, forwardRef(() => AssignmentModule)],
  providers: [EventPublisherService, AuthEventConsumer],
  exports: [EventPublisherService],
})
export class EventsModule {}
