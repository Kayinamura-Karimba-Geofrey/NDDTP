import { Injectable, Logger } from '@nestjs/common';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/inventory.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { WarehouseStatus } from '../../common/enums';

@Injectable()
export class WarehouseService {
  private readonly logger = new Logger(WarehouseService.name);

  constructor(
    private readonly repo: WarehouseRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateWarehouseDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const warehouse = await this.repo.create({
      code: dto.code,
      name: dto.name,
      location: dto.location ?? null,
      status: WarehouseStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.WAREHOUSES);
    await this.publisher.publishWarehouseCreated({ warehouseId: warehouse.id, code: warehouse.code });
    this.logger.log(`Warehouse created: ${warehouse.code}`);
    return warehouse;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.WAREHOUSES);
    if (cached) return JSON.parse(cached);
    const warehouses = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.WAREHOUSES, JSON.stringify(warehouses), 600);
    return warehouses;
  }

  async findById(id: string) {
    const warehouse = await this.repo.findById(id);
    if (!warehouse) throw new ResourceNotFoundException('Warehouse', id);
    return warehouse;
  }
}
