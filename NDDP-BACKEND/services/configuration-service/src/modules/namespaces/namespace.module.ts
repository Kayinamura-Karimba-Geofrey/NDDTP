import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigNamespace } from '../../database/entities/config-namespace.entity';
import { NamespaceRepository } from './repositories/namespace.repository';
import { NamespaceService } from './namespace.service';
import { NamespaceController } from './namespace.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigNamespace]), RedisModule, EventsModule],
  controllers: [NamespaceController],
  providers: [NamespaceRepository, NamespaceService],
  exports: [NamespaceRepository, NamespaceService],
})
export class NamespaceModule {}
