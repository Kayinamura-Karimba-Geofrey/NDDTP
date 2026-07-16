import { Injectable, Logger } from '@nestjs/common';
import { VendorRepository } from './repositories/vendor.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateVendorDto } from './dto/vendor.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/procurement.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { VendorStatus } from '../../common/enums';

@Injectable()
export class VendorService {
  private readonly logger = new Logger(VendorService.name);

  constructor(
    private readonly repo: VendorRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateVendorDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const vendor = await this.repo.create({
      code: dto.code,
      name: dto.name,
      category: dto.category,
      contactEmail: dto.contactEmail ?? null,
      contactPhone: dto.contactPhone ?? null,
      address: dto.address ?? null,
      status: VendorStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.VENDORS);
    await this.publisher.publishVendorCreated({ vendorId: vendor.id, code: vendor.code });
    this.logger.log(`Vendor created: ${vendor.code}`);
    return vendor;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.VENDORS);
    if (cached) return JSON.parse(cached);
    const vendors = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.VENDORS, JSON.stringify(vendors), 600);
    return vendors;
  }

  async findById(id: string) {
    const vendor = await this.repo.findById(id);
    if (!vendor) throw new ResourceNotFoundException('Vendor', id);
    return vendor;
  }
}
