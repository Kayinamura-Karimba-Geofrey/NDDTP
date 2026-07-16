import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLevel, StockMovement } from '../../database/entities';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockRepository } from './repositories/stock.repository';
import { WarehouseModule } from '../warehouses/warehouse.module';
import { ItemModule } from '../items/item.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockLevel, StockMovement]), WarehouseModule, ItemModule, EventsModule],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockRepository, StockService],
})
export class StockModule {}
