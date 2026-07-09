import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { BiDatasetModule } from './modules/datasets/dataset.module';
import { SemanticModelModule } from './modules/models/semantic-model.module';
import { BiReportModule } from './modules/reports/bi-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-business-intelligence-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    BiDatasetModule,
    SemanticModelModule,
    BiReportModule,
  ],
})
export class AppModule {}
