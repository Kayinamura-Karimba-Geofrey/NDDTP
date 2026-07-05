import { Injectable, Logger } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { ConsumerRepository } from './repositories/consumer.repository';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateConsumerDto, IssueKeyDto } from './dto/consumer.dto';
import {
  DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException,
  InvalidStatusTransitionException,
} from '../../common/exceptions/apimanagement.exceptions';
import { CACHE_KEYS, API_KEY_STATUS_TRANSITIONS } from '../../common/constants';
import { ConsumerStatus, ApiKeyStatus } from '../../common/enums';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(
    private readonly consumerRepo: ConsumerRepository,
    private readonly keyRepo: ApiKeyRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateConsumerDto) {
    const existing = await this.consumerRepo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const consumer = await this.consumerRepo.create({
      code: dto.code,
      name: dto.name,
      contactEmail: dto.contactEmail ?? null,
      description: dto.description ?? null,
      status: ConsumerStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.CONSUMERS);
    await this.publisher.publishConsumerCreated({ consumerId: consumer.id, code: consumer.code });
    this.logger.log(`API consumer created: ${consumer.code}`);
    return consumer;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.CONSUMERS);
    if (cached) return JSON.parse(cached);
    const consumers = await this.consumerRepo.findActive();
    await this.redis.set(CACHE_KEYS.CONSUMERS, JSON.stringify(consumers), 600);
    return consumers;
  }

  async findById(id: string) {
    const consumer = await this.consumerRepo.findById(id);
    if (!consumer) throw new ResourceNotFoundException('ApiConsumer', id);
    return consumer;
  }

  async issueKey(consumerId: string, issuedBy: string, dto: IssueKeyDto) {
    const consumer = await this.findById(consumerId);
    if (consumer.status !== ConsumerStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Consumer is not active');
    }

    const rawKey = `nddtp_${randomBytes(32).toString('hex')}`;
    const keyPrefix = rawKey.slice(0, 12);
    const keyHash = createHash('sha256').update(rawKey).digest('hex');

    const apiKey = await this.keyRepo.create({
      consumerId,
      keyPrefix,
      keyHash,
      issuedBy,
      status: ApiKeyStatus.ACTIVE,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    });

    await this.publisher.publishKeyIssued({ keyId: apiKey.id, consumerId, keyPrefix });
    this.logger.log(`API key issued for consumer: ${consumer.code}`);
    return { ...apiKey, rawKey };
  }

  async revokeKey(keyId: string) {
    const key = await this.keyRepo.findById(keyId);
    if (!key) throw new ResourceNotFoundException('ApiKey', keyId);
    this.assertKeyTransition(key.status, ApiKeyStatus.REVOKED);
    await this.keyRepo.update(keyId, { status: ApiKeyStatus.REVOKED, revokedAt: new Date() });
    await this.publisher.publishKeyRevoked({ keyId, consumerId: key.consumerId, keyPrefix: key.keyPrefix });
    return this.keyRepo.findById(keyId);
  }

  async suspend(consumerId: string) {
    const consumer = await this.findById(consumerId);
    if (consumer.status !== ConsumerStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Consumer is already suspended');
    }
    await this.consumerRepo.update(consumerId, { status: ConsumerStatus.SUSPENDED });
    await this.redis.del(CACHE_KEYS.CONSUMERS);
    return this.consumerRepo.findById(consumerId);
  }

  async findKeys(consumerId: string) {
    await this.findById(consumerId);
    return this.keyRepo.findByConsumer(consumerId);
  }

  private assertKeyTransition(from: ApiKeyStatus, to: ApiKeyStatus) {
    const allowed = API_KEY_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
