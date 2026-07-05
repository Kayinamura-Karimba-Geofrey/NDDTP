import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricDefinition } from '../../database/entities/metric-definition.entity';
import { MetricSnapshot } from '../../database/entities/metric-snapshot.entity';
import { MetricDefinitionRepository, MetricSnapshotRepository } from './repositories/metric.repository';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetricDefinition, MetricSnapshot]),
    RedisModule,
    EventsModule,
  ],
  controllers: [MetricController],
  providers: [MetricDefinitionRepository, MetricSnapshotRepository, MetricService],
  exports: [MetricDefinitionRepository, MetricService],
})
export class MetricModule {}
