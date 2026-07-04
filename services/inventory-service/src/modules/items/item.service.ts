import { Injectable, Logger } from '@nestjs/common';
import { ItemRepository } from './repositories/item.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateItemDto } from './dto/item.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/inventory.exceptions';
import { ItemCategory } from '../../common/enums';
import { UnitOfMeasure } from '../../common/enums';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    private readonly repo: ItemRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateItemDto) {
    const existing = await this.repo.findBySku(dto.sku);
    if (existing) throw new DuplicateResourceException('sku', dto.sku);

    const item = await this.repo.create({
      sku: dto.sku,
      name: dto.name,
      category: dto.category,
      unit: dto.unit ?? UnitOfMeasure.EACH,
      description: dto.description ?? null,
      reorderLevel: dto.reorderLevel ?? 0,
      isActive: true,
    });

    await this.publisher.publishItemCreated({ itemId: item.id, sku: item.sku, name: item.name });
    this.logger.log(`Item created: ${item.sku}`);
    return item;
  }

  async findById(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new ResourceNotFoundException('InventoryItem', id);
    return item;
  }

  findAll(filter: { page?: number; limit?: number; category?: ItemCategory }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.category);
  }

  findLowStock() {
    return this.repo.findLowStock();
  }
}
