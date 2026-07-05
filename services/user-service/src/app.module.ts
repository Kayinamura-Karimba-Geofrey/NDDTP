import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { UserModule } from './modules/users/user.module';
import { DepartmentModule } from './modules/departments/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-user-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    UserModule,
    DepartmentModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
