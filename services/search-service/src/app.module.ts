import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { SearchIndexModule } from './modules/indexes/search-index.module';
import { SearchDocumentModule } from './modules/documents/search-document.module';
import { SearchQueryModule } from './modules/queries/search-query.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-search-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    SearchIndexModule,
    SearchDocumentModule,
    SearchQueryModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
