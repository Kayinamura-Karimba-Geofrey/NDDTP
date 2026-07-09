import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { RoleModule } from './modules/roles/role.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { AssignmentModule } from './modules/assignments/assignment.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-authorization-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    RoleModule,
    PermissionModule,
    AssignmentModule,
    AuthorizationModule,
  ],
})
export class AppModule {}
