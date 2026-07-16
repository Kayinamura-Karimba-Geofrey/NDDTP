import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringCheck } from '../../database/entities/monitoring-check.entity';
import { CheckRepository } from './repositories/check.repository';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { TargetModule } from '../targets/target.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringCheck]), TargetModule, EventsModule],
  controllers: [CheckController],
  providers: [CheckRepository, CheckService],
  exports: [CheckRepository, CheckService],
})
export class CheckModule {}
