import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AssetRepository } from './repositories/asset.repository';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { MovementRepository } from '../movements/repositories/movement.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, DuplicateResourceException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/asset.exceptions';
import { CreateAssetDto, TransferAssetDto, DisposeAssetDto } from './dto/asset.dto';
import { AssetStatus, MovementType } from '../../common/enums';
import { ASSET_STATUS_TRANSITIONS, CACHE_KEYS } from '../../common/constants';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(
    private readonly repo: AssetRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly movementRepo: MovementRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async register(dto: CreateAssetDto) {
    const category = await this.categoryRepo.findById(dto.categoryId);
    if (!category) throw new ResourceNotFoundException('AssetCategory', dto.categoryId);
    if (dto.serialNumber) {
      const existing = await this.repo.findBySerial(dto.serialNumber);
      if (existing) throw new DuplicateResourceException('serialNumber', dto.serialNumber);
    }

    const assetNumber = `AST-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const asset = await this.repo.create({
      assetNumber,
      categoryId: dto.categoryId,
      name: dto.name,
      serialNumber: dto.serialNumber ?? null,
      unitId: dto.unitId ?? null,
      acquisitionDate: dto.acquisitionDate ?? null,
      value: dto.value ?? null,
      notes: dto.notes ?? null,
      status: AssetStatus.REGISTERED,
    });

    await this.publisher.publishAssetRegistered({ assetId: asset.id, assetNumber, categoryId: dto.categoryId });
    this.logger.log(`Asset registered: ${assetNumber}`);
    return this.repo.findById(asset.id);
  }

  async makeAvailable(id: string) {
    const asset = await this.findById(id);
    this.assertTransition(asset.status, AssetStatus.AVAILABLE);
    await this.repo.update(id, { status: AssetStatus.AVAILABLE });
    await this.redis.del(CACHE_KEYS.ASSET(id));
    return this.repo.findById(id);
  }

  async transfer(id: string, movedBy: string, dto: TransferAssetDto) {
    const asset = await this.findById(id);
    if (![AssetStatus.AVAILABLE, AssetStatus.ASSIGNED].includes(asset.status)) {
      throw new BusinessRuleViolationException('Only available or assigned assets can be transferred');
    }

    const fromUnitId = asset.unitId;
    await this.repo.update(id, { unitId: dto.toUnitId, status: AssetStatus.AVAILABLE });
    await this.movementRepo.create({
      assetId: id,
      movementType: MovementType.TRANSFER,
      fromUnitId,
      toUnitId: dto.toUnitId,
      notes: dto.notes ?? null,
      movedBy,
    });

    await this.redis.del(CACHE_KEYS.ASSET(id));
    await this.publisher.publishAssetTransferred({ assetId: id, assetNumber: asset.assetNumber, fromUnitId, toUnitId: dto.toUnitId });
    return this.repo.findById(id);
  }

  async dispose(id: string, movedBy: string, dto: DisposeAssetDto) {
    const asset = await this.findById(id);
    this.assertTransition(asset.status, AssetStatus.DISPOSED);

    await this.repo.update(id, { status: AssetStatus.DISPOSED, notes: dto.reason });
    await this.movementRepo.create({
      assetId: id,
      movementType: MovementType.DISPOSAL,
      fromUnitId: asset.unitId,
      notes: dto.reason,
      movedBy,
    });

    await this.redis.del(CACHE_KEYS.ASSET(id));
    await this.publisher.publishAssetDisposed({ assetId: id, assetNumber: asset.assetNumber, reason: dto.reason });
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.ASSET(id));
    if (cached) return JSON.parse(cached);

    const asset = await this.repo.findById(id);
    if (!asset) throw new ResourceNotFoundException('Asset', id);
    await this.redis.set(CACHE_KEYS.ASSET(id), JSON.stringify(asset), 300);
    return asset;
  }

  findAll(filter: { page?: number; limit?: number; status?: AssetStatus; categoryId?: string; unitId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.categoryId, filter.unitId);
  }

  private assertTransition(from: AssetStatus, to: AssetStatus) {
    const allowed = ASSET_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
