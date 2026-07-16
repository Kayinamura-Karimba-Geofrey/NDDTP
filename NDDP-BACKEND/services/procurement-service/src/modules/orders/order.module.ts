import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder, PurchaseOrderItem } from '../../database/entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repositories/order.repository';
import { VendorModule } from '../vendors/vendor.module';
import { RequisitionModule } from '../requisitions/requisition.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderItem]), VendorModule, RequisitionModule, EventsModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository, OrderService],
})
export class OrderModule {}
