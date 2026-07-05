import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from '../../database/entities/inventory-item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './repositories/item.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem]), EventsModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemRepository],
})
export class ItemModule {}
