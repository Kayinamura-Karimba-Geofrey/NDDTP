import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConsumer, ApiKey } from '../../database/entities';
import { ConsumerRepository } from './repositories/consumer.repository';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApiConsumer, ApiKey]), RedisModule, EventsModule],
  controllers: [ConsumerController],
  providers: [ConsumerRepository, ApiKeyRepository, ConsumerService],
  exports: [ConsumerRepository, ConsumerService],
})
export class ConsumerModule {}
