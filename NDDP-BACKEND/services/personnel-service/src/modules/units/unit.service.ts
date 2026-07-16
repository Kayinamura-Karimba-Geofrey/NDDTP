import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnitRepository } from './repositories/unit.repository';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/personnel.exceptions';
import { CreateUnitDto, UpdateUnitDto } from './dto/unit.dto';

@Injectable()
export class UnitService {
  constructor(
    private readonly repo: UnitRepository,
    private readonly redis: RedisService,
    private readonly cs: ConfigService,
  ) {}

  async create(dto: CreateUnitDto) {
    if (await this.repo.findByCode(dto.code)) throw new DuplicateResourceException('code', dto.code);
    if (dto.parentUnitId) {
      const parent = await this.repo.findById(dto.parentUnitId);
      if (!parent) throw new ResourceNotFoundException('Unit', dto.parentUnitId);
    }
    return this.repo.create(dto);
  }

  findAll() { return this.repo.findAll(); }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.UNIT(id));
    if (cached) return JSON.parse(cached);
    const unit = await this.repo.findById(id);
    if (!unit) throw new ResourceNotFoundException('Unit', id);
    const ttl = this.cs.get<number>('redis.ttl.personnel') || 900;
    await this.redis.set(CACHE_KEYS.UNIT(id), JSON.stringify(unit), ttl);
    return unit;
  }

  async update(id: string, dto: UpdateUnitDto) {
    await this.findById(id);
    await this.repo.update(id, dto);
    await this.redis.del(CACHE_KEYS.UNIT(id));
    return this.findById(id);
  }
}
