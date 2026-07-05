import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrder, WorkOrderTask, MaintenanceLog } from '../../database/entities';
import { WorkOrderController } from './work-order.controller';
import { WorkOrderService } from './work-order.service';
import { WorkOrderRepository } from './repositories/work-order.repository';
import { RequestModule } from '../requests/request.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrder, WorkOrderTask, MaintenanceLog]), RequestModule, EventsModule],
  controllers: [WorkOrderController],
  providers: [WorkOrderService, WorkOrderRepository],
  exports: [WorkOrderRepository, WorkOrderService],
})
export class WorkOrderModule {}
