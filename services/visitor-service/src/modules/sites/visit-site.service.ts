import { Injectable, Logger } from '@nestjs/common';
import { VisitSiteRepository } from './repositories/visit-site.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateVisitSiteDto } from './dto/visit-site.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/visitor.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { SiteStatus } from '../../common/enums';

@Injectable()
export class VisitSiteService {
  private readonly logger = new Logger(VisitSiteService.name);

  constructor(
    private readonly repo: VisitSiteRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateVisitSiteDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const site = await this.repo.create({
      code: dto.code,
      name: dto.name,
      siteType: dto.siteType,
      location: dto.location ?? null,
      status: SiteStatus.ACTIVE,
      notes: dto.notes ?? null,
    });

    await this.redis.del(CACHE_KEYS.SITES);
    await this.publisher.publishSiteCreated({ siteId: site.id, code: site.code });
    this.logger.log(`Visit site created: ${site.code}`);
    return site;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.SITES);
    if (cached) return JSON.parse(cached);
    const sites = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.SITES, JSON.stringify(sites), 600);
    return sites;
  }

  async findById(id: string) {
    const site = await this.repo.findById(id);
    if (!site) throw new ResourceNotFoundException('VisitSite', id);
    return site;
  }
}
