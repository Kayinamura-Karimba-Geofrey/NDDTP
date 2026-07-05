import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { WorkflowDefinitionModule } from './modules/definitions/workflow-definition.module';
import { WorkflowInstanceModule } from './modules/instances/workflow-instance.module';
import { WorkflowTaskModule } from './modules/tasks/workflow-task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-workflow-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    WorkflowDefinitionModule,
    WorkflowInstanceModule,
    WorkflowTaskModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
