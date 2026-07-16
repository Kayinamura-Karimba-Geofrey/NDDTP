import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../../database/entities/vendor.entity';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorRepository } from './repositories/vendor.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor]), EventsModule],
  controllers: [VendorController],
  providers: [VendorService, VendorRepository],
  exports: [VendorRepository, VendorService],
})
export class VendorModule {}
