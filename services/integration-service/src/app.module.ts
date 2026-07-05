import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { ConnectorModule } from './modules/connectors/connector.module';
import { EndpointModule } from './modules/endpoints/endpoint.module';
import { JobModule } from './modules/jobs/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-integration-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    ConnectorModule,
    EndpointModule,
    JobModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
