import { Injectable, Logger } from '@nestjs/common';
import { StockRepository } from './repositories/stock.repository';
import { WarehouseRepository } from '../warehouses/repositories/warehouse.repository';
import { ItemRepository } from '../items/repositories/item.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, InsufficientStockException } from '../../common/exceptions/inventory.exceptions';
import { StockOperationDto, AdjustStockDto } from './dto/stock.dto';
import { StockMovementType } from '../../common/enums';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(
    private readonly repo: StockRepository,
    private readonly warehouseRepo: WarehouseRepository,
    private readonly itemRepo: ItemRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async receive(performedBy: string, dto: StockOperationDto) {
    await this.validateRefs(dto.warehouseId, dto.itemId);
    const level = await this.repo.upsertLevel(dto.warehouseId, dto.itemId, dto.quantity);

    await this.repo.createMovement({
      warehouseId: dto.warehouseId,
      itemId: dto.itemId,
      movementType: StockMovementType.RECEIPT,
      quantity: dto.quantity,
      notes: dto.notes ?? null,
      performedBy,
    });

    await this.redis.del(CACHE_KEYS.STOCK(dto.warehouseId, dto.itemId));
    await this.publisher.publishStockReceived({
      warehouseId: dto.warehouseId, itemId: dto.itemId, quantity: dto.quantity, newBalance: level.quantity,
    });

    this.logger.log(`Received ${dto.quantity} of item ${dto.itemId}`);
    return level;
  }

  async issue(performedBy: string, dto: StockOperationDto) {
    await this.validateRefs(dto.warehouseId, dto.itemId);
    const level = await this.repo.findLevel(dto.warehouseId, dto.itemId);
    const available = (level?.quantity ?? 0) - (level?.reservedQuantity ?? 0);
    if (available < dto.quantity) {
      throw new InsufficientStockException(dto.itemId, available, dto.quantity);
    }

    const updated = await this.repo.upsertLevel(dto.warehouseId, dto.itemId, -dto.quantity);
    await this.repo.createMovement({
      warehouseId: dto.warehouseId,
      itemId: dto.itemId,
      movementType: StockMovementType.ISSUE,
      quantity: dto.quantity,
      notes: dto.notes ?? null,
      performedBy,
    });

    await this.redis.del(CACHE_KEYS.STOCK(dto.warehouseId, dto.itemId));
    await this.publisher.publishStockIssued({
      warehouseId: dto.warehouseId, itemId: dto.itemId, quantity: dto.quantity, newBalance: updated.quantity,
    });

    return updated;
  }

  async adjust(performedBy: string, dto: AdjustStockDto) {
    await this.validateRefs(dto.warehouseId, dto.itemId);
    const existing = await this.repo.findLevel(dto.warehouseId, dto.itemId);
    const oldQty = existing?.quantity ?? 0;
    const delta = dto.quantity - oldQty;

    let level: { quantity: number };
    if (existing) {
      existing.quantity = dto.quantity;
      level = await this.repo.upsertLevel(dto.warehouseId, dto.itemId, delta);
    } else {
      level = await this.repo.upsertLevel(dto.warehouseId, dto.itemId, dto.quantity);
    }

    await this.repo.createMovement({
      warehouseId: dto.warehouseId,
      itemId: dto.itemId,
      movementType: StockMovementType.ADJUSTMENT,
      quantity: Math.abs(delta),
      notes: dto.notes ?? `Adjusted from ${oldQty} to ${dto.quantity}`,
      performedBy,
    });

    await this.redis.del(CACHE_KEYS.STOCK(dto.warehouseId, dto.itemId));
    await this.publisher.publishStockAdjusted({
      warehouseId: dto.warehouseId, itemId: dto.itemId, oldQuantity: oldQty, newQuantity: dto.quantity,
    });

    return level;
  }

  async getLevel(warehouseId: string, itemId: string) {
    const level = await this.repo.findLevel(warehouseId, itemId);
    if (!level) return { warehouseId, itemId, quantity: 0, reservedQuantity: 0, available: 0 };
    return { ...level, available: level.quantity - level.reservedQuantity };
  }

  findByWarehouse(warehouseId: string) {
    return this.repo.findByWarehouse(warehouseId);
  }

  findMovements(warehouseId?: string, itemId?: string) {
    return this.repo.findMovements(warehouseId, itemId);
  }

  private async validateRefs(warehouseId: string, itemId: string) {
    const warehouse = await this.warehouseRepo.findById(warehouseId);
    if (!warehouse) throw new ResourceNotFoundException('Warehouse', warehouseId);
    const item = await this.itemRepo.findById(itemId);
    if (!item) throw new ResourceNotFoundException('InventoryItem', itemId);
  }
}
