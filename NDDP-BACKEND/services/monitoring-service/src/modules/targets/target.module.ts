import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringTarget } from '../../database/entities/monitoring-target.entity';
import { TargetRepository } from './repositories/target.repository';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringTarget]), RedisModule, EventsModule],
  controllers: [TargetController],
  providers: [TargetRepository, TargetService],
  exports: [TargetRepository, TargetService],
})
export class TargetModule {}
