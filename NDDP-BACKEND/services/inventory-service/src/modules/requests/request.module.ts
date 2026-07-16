import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockRequest } from '../../database/entities/stock-request.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestRepository } from './repositories/request.repository';
import { WarehouseModule } from '../warehouses/warehouse.module';
import { ItemModule } from '../items/item.module';
import { StockModule } from '../stock/stock.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockRequest]), WarehouseModule, ItemModule, StockModule, EventsModule],
  controllers: [RequestController],
  providers: [RequestService, RequestRepository],
})
export class RequestModule {}
