import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from '../../database/entities/dashboard.entity';
import { DashboardRepository } from './repositories/dashboard.repository';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MetricModule } from '../metrics/metric.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dashboard]),
    MetricModule,
    RedisModule,
    EventsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardRepository, DashboardService],
})
export class DashboardModule {}
