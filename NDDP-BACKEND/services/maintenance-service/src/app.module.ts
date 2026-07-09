import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { CategoryModule } from './modules/categories/category.module';
import { RequestModule } from './modules/requests/request.module';
import { WorkOrderModule } from './modules/work-orders/work-order.module';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-maintenance-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    CategoryModule,
    RequestModule,
    WorkOrderModule,
    TaskModule,
  ],
})
export class AppModule {}
