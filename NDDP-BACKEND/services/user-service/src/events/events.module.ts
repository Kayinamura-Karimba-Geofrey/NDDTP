import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPublisherService } from './event-publisher.service';
import { AuthEventConsumer } from '../queues/auth-event.consumer';
import { User } from '../database/entities/user.entity';
import { UserRepository } from '../modules/users/repositories/user.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [EventPublisherService, AuthEventConsumer, UserRepository],
  exports: [EventPublisherService],
})
export class EventsModule {}
