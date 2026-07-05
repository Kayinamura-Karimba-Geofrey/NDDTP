import { Injectable, Logger } from '@nestjs/common';
import { NamespaceRepository } from './repositories/namespace.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateNamespaceDto } from './dto/namespace.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/configuration.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { NamespaceStatus } from '../../common/enums';

@Injectable()
export class NamespaceService {
  private readonly logger = new Logger(NamespaceService.name);

  constructor(
    private readonly repo: NamespaceRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateNamespaceDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const namespace = await this.repo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description ?? null,
      status: NamespaceStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.NAMESPACES);
    await this.publisher.publishNamespaceCreated({ namespaceId: namespace.id, code: namespace.code });
    this.logger.log(`Namespace created: ${namespace.code}`);
    return namespace;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.NAMESPACES);
    if (cached) return JSON.parse(cached);
    const namespaces = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.NAMESPACES, JSON.stringify(namespaces), 600);
    return namespaces;
  }

  async findById(id: string) {
    const namespace = await this.repo.findById(id);
    if (!namespace) throw new ResourceNotFoundException('ConfigNamespace', id);
    return namespace;
  }
}
