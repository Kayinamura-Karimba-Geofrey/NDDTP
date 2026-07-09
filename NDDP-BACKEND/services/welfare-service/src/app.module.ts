import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { ProgramModule } from './modules/programs/program.module';
import { DependentModule } from './modules/dependents/dependent.module';
import { ClaimModule } from './modules/claims/claim.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-welfare-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    ProgramModule,
    DependentModule,
    ClaimModule,
  ],
})
export class AppModule {}
