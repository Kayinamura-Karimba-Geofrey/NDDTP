import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentTracking } from '../../database/entities/shipment-tracking.entity';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { TrackingRepository } from './repositories/tracking.repository';
import { ShipmentModule } from '../shipments/shipment.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentTracking]), forwardRef(() => ShipmentModule), EventsModule],
  controllers: [TrackingController],
  providers: [TrackingService, TrackingRepository],
  exports: [TrackingRepository, TrackingService],
})
export class TrackingModule {}
