import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { NamespaceModule } from './modules/namespaces/namespace.module';
import { ConfigEntryModule } from './modules/entries/config-entry.module';
import { RevisionModule } from './modules/revisions/revision.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-configuration-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    NamespaceModule,
    ConfigEntryModule,
    RevisionModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
