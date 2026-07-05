import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { LeaveTypeModule } from './modules/leave-types/leave-type.module';
import { LeaveBalanceModule } from './modules/leave-balances/leave-balance.module';
import { LeaveRequestModule } from './modules/leave-requests/leave-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-leave-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    LeaveTypeModule,
    LeaveBalanceModule,
    LeaveRequestModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
