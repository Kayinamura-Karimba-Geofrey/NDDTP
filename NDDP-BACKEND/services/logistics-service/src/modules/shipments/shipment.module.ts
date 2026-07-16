import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment, ShipmentItem } from '../../database/entities';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { ShipmentRepository } from './repositories/shipment.repository';
import { LocationModule } from '../locations/location.module';
import { RouteModule } from '../routes/route.module';
import { TrackingModule } from '../tracking/tracking.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shipment, ShipmentItem]),
    LocationModule,
    RouteModule,
    forwardRef(() => TrackingModule),
    EventsModule,
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService, ShipmentRepository],
  exports: [ShipmentRepository, ShipmentService],
})
export class ShipmentModule {}
