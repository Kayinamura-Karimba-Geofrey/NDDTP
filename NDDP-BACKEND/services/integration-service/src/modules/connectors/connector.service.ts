import { Injectable, Logger } from '@nestjs/common';
import { ConnectorRepository } from './repositories/connector.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateConnectorDto } from './dto/connector.dto';
import { DuplicateResourceException, ResourceNotFoundException } from '../../common/exceptions/integration.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { ConnectorStatus } from '../../common/enums';

@Injectable()
export class ConnectorService {
  private readonly logger = new Logger(ConnectorService.name);

  constructor(
    private readonly repo: ConnectorRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateConnectorDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const connector = await this.repo.create({
      code: dto.code,
      name: dto.name,
      connectorType: dto.connectorType,
      baseUrl: dto.baseUrl,
      description: dto.description ?? null,
      config: dto.config ?? null,
      status: ConnectorStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.CONNECTORS);
    await this.publisher.publishConnectorCreated({ connectorId: connector.id, code: connector.code });
    this.logger.log(`Connector created: ${connector.code}`);
    return connector;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.CONNECTORS);
    if (cached) return JSON.parse(cached);
    const connectors = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.CONNECTORS, JSON.stringify(connectors), 600);
    return connectors;
  }

  async findById(id: string) {
    const connector = await this.repo.findById(id);
    if (!connector) throw new ResourceNotFoundException('IntegrationConnector', id);
    return connector;
  }
}
