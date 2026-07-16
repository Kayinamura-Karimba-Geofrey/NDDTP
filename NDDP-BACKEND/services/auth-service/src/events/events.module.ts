import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPublisherService } from './event-publisher.service';
import { UserEventConsumer } from '../queues/user-event.consumer';
import { AuthCredential } from '../database/entities/auth-credential.entity';
import { AuthCredentialRepository } from '../modules/credentials/repositories/auth-credential.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AuthCredential]),
  ],
  providers: [EventPublisherService, UserEventConsumer, AuthCredentialRepository],
  exports: [EventPublisherService],
})
export class EventsModule {}
