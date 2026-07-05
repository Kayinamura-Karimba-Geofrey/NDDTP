import { Injectable, Logger } from '@nestjs/common';
import { ConfigEntryRepository } from './repositories/config-entry.repository';
import { ConfigRevisionRepository } from '../revisions/repositories/config-revision.repository';
import { NamespaceRepository } from '../namespaces/repositories/namespace.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateConfigEntryDto, UpdateConfigEntryDto } from './dto/config-entry.dto';
import {
  DuplicateResourceException, ResourceNotFoundException,
  InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/configuration.exceptions';
import { CACHE_KEYS, ENTRY_STATUS_TRANSITIONS } from '../../common/constants';
import { EntryValueType, EntryStatus, EnvironmentScope, NamespaceStatus } from '../../common/enums';

@Injectable()
export class ConfigEntryService {
  private readonly logger = new Logger(ConfigEntryService.name);

  constructor(
    private readonly repo: ConfigEntryRepository,
    private readonly revisionRepo: ConfigRevisionRepository,
    private readonly namespaceRepo: NamespaceRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateConfigEntryDto) {
    const namespace = await this.namespaceRepo.findById(dto.namespaceId);
    if (!namespace) throw new ResourceNotFoundException('ConfigNamespace', dto.namespaceId);
    if (namespace.status !== NamespaceStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Namespace is not active');
    }

    const existing = await this.repo.findByNamespaceAndKey(dto.namespaceId, dto.key);
    if (existing) throw new DuplicateResourceException('key', dto.key);

    const entry = await this.repo.create({
      namespaceId: dto.namespaceId,
      key: dto.key,
      value: dto.value,
      valueType: dto.valueType ?? EntryValueType.STRING,
      status: EntryStatus.DRAFT,
      environment: dto.environment ?? EnvironmentScope.ALL,
      description: dto.description ?? null,
      createdBy,
    });

    await this.revisionRepo.create({
      entryId: entry.id,
      previousValue: null,
      newValue: dto.value,
      changedBy: createdBy,
      version: 1,
    });

    await this.redis.del(CACHE_KEYS.NAMESPACE_ENTRIES(dto.namespaceId));
    await this.publisher.publishEntryCreated({ entryId: entry.id, key: entry.key, namespaceId: dto.namespaceId });
    this.logger.log(`Config entry created: ${entry.key}`);
    return this.repo.findById(entry.id);
  }

  async update(id: string, changedBy: string, dto: UpdateConfigEntryDto) {
    const entry = await this.findById(id);
    if (entry.status === EntryStatus.DEPRECATED) {
      throw new BusinessRuleViolationException('Cannot update a deprecated entry');
    }

    const version = await this.revisionRepo.getNextVersion(id);
    await this.revisionRepo.create({
      entryId: id,
      previousValue: entry.value,
      newValue: dto.value,
      changedBy,
      version,
    });

    await this.repo.update(id, { value: dto.value, description: dto.description ?? entry.description });
    await this.redis.del(CACHE_KEYS.ENTRY(entry.namespaceId, entry.key));
    await this.redis.del(CACHE_KEYS.NAMESPACE_ENTRIES(entry.namespaceId));
    await this.publisher.publishEntryUpdated({ entryId: id, key: entry.key, version });
    return this.repo.findById(id);
  }

  async activate(id: string) {
    const entry = await this.findById(id);
    this.assertTransition(entry.status, EntryStatus.ACTIVE);
    await this.repo.update(id, { status: EntryStatus.ACTIVE });
    await this.redis.del(CACHE_KEYS.NAMESPACE_ENTRIES(entry.namespaceId));
    await this.publisher.publishEntryActivated({ entryId: id, key: entry.key });
    return this.repo.findById(id);
  }

  async deprecate(id: string) {
    const entry = await this.findById(id);
    this.assertTransition(entry.status, EntryStatus.DEPRECATED);
    await this.repo.update(id, { status: EntryStatus.DEPRECATED });
    await this.redis.del(CACHE_KEYS.NAMESPACE_ENTRIES(entry.namespaceId));
    await this.publisher.publishEntryDeprecated({ entryId: id, key: entry.key });
    return this.repo.findById(id);
  }

  async findActiveByNamespace(namespaceId: string) {
    await this.namespaceRepo.findById(namespaceId);
    const cached = await this.redis.get(CACHE_KEYS.NAMESPACE_ENTRIES(namespaceId));
    if (cached) return JSON.parse(cached);
    const entries = await this.repo.findActiveByNamespace(namespaceId);
    await this.redis.set(CACHE_KEYS.NAMESPACE_ENTRIES(namespaceId), JSON.stringify(entries), 300);
    return entries;
  }

  findByNamespace(namespaceId: string) {
    return this.repo.findByNamespace(namespaceId);
  }

  async findById(id: string) {
    const entry = await this.repo.findById(id);
    if (!entry) throw new ResourceNotFoundException('ConfigEntry', id);
    return entry;
  }

  private assertTransition(from: EntryStatus, to: EntryStatus) {
    const allowed = ENTRY_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
