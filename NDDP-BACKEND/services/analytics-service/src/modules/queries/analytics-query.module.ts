import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsQuery } from '../../database/entities/analytics-query.entity';
import { AnalyticsQueryRepository } from './repositories/analytics-query.repository';
import { AnalyticsQueryService } from './analytics-query.service';
import { AnalyticsQueryController } from './analytics-query.controller';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsQuery]), EventsModule],
  controllers: [AnalyticsQueryController],
  providers: [AnalyticsQueryRepository, AnalyticsQueryService],
})
export class AnalyticsQueryModule {}
