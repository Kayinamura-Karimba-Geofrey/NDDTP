import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceBooking } from '../../database/entities/space-booking.entity';
import { BookingLog } from '../../database/entities/booking-log.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { SpaceBookingRepository } from './repositories/space-booking.repository';
import { BookingLogRepository } from './repositories/booking-log.repository';
import { FacilitySpaceModule } from '../spaces/facility-space.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceBooking, BookingLog]), FacilitySpaceModule, EventsModule],
  controllers: [BookingController],
  providers: [BookingService, SpaceBookingRepository, BookingLogRepository],
  exports: [SpaceBookingRepository, BookingService],
})
export class BookingModule {}
