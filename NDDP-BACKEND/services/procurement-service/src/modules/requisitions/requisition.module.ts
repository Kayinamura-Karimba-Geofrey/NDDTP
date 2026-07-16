import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequisition, RequisitionItem } from '../../database/entities';
import { RequisitionController } from './requisition.controller';
import { RequisitionService } from './requisition.service';
import { RequisitionRepository } from './repositories/requisition.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseRequisition, RequisitionItem]), EventsModule],
  controllers: [RequisitionController],
  providers: [RequisitionService, RequisitionRepository],
  exports: [RequisitionRepository, RequisitionService],
})
export class RequisitionModule {}
