import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { CycleModule } from './modules/cycles/cycle.module';
import { CriteriaModule } from './modules/criteria/criteria.module';
import { GoalModule } from './modules/goals/goal.module';
import { ReviewModule } from './modules/reviews/review.module';
import { PlanModule } from './modules/plans/plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-performance-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    CycleModule,
    CriteriaModule,
    GoalModule,
    ReviewModule,
    PlanModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}
