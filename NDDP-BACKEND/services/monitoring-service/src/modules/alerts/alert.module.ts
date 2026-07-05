import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringAlert } from '../../database/entities/monitoring-alert.entity';
import { AlertRepository } from './repositories/alert.repository';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { CheckModule } from '../checks/check.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringAlert]), CheckModule, EventsModule],
  controllers: [AlertController],
  providers: [AlertRepository, AlertService],
})
export class AlertModule {}
