import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { CategoryModule } from './modules/categories/category.module';
import { AssetModule } from './modules/assets/asset.module';
import { AssignmentModule } from './modules/assignments/assignment.module';
import { MovementModule } from './modules/movements/movement.module';
import { AuditModule } from './modules/audits/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-asset-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    CategoryModule,
    AssetModule,
    AssignmentModule,
    MovementModule,
    AuditModule,
  ],
})
export class AppModule {}
