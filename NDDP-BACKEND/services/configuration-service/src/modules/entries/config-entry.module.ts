import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntry } from '../../database/entities/config-entry.entity';
import { ConfigRevision } from '../../database/entities/config-revision.entity';
import { ConfigEntryRepository } from './repositories/config-entry.repository';
import { ConfigRevisionRepository } from '../revisions/repositories/config-revision.repository';
import { ConfigEntryService } from './config-entry.service';
import { ConfigEntryController } from './config-entry.controller';
import { NamespaceModule } from '../namespaces/namespace.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigEntry, ConfigRevision]),
    NamespaceModule,
    RedisModule,
    EventsModule,
  ],
  controllers: [ConfigEntryController],
  providers: [ConfigEntryRepository, ConfigRevisionRepository, ConfigEntryService],
  exports: [ConfigEntryRepository, ConfigRevisionRepository, ConfigEntryService],
})
export class ConfigEntryModule {}
