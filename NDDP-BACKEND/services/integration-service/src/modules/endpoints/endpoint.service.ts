import { Injectable, Logger } from '@nestjs/common';
import { EndpointRepository } from './repositories/endpoint.repository';
import { ConnectorRepository } from '../connectors/repositories/connector.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateEndpointDto } from './dto/endpoint.dto';
import {
  DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException,
} from '../../common/exceptions/integration.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { ConnectorStatus, EndpointStatus, HttpMethod } from '../../common/enums';

@Injectable()
export class EndpointService {
  private readonly logger = new Logger(EndpointService.name);

  constructor(
    private readonly repo: EndpointRepository,
    private readonly connectorRepo: ConnectorRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateEndpointDto) {
    const connector = await this.connectorRepo.findById(dto.connectorId);
    if (!connector) throw new ResourceNotFoundException('IntegrationConnector', dto.connectorId);
    if (connector.status !== ConnectorStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Connector is not active');
    }

    const existing = await this.repo.findByConnectorAndCode(dto.connectorId, dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const endpoint = await this.repo.create({
      connectorId: dto.connectorId,
      code: dto.code,
      name: dto.name,
      path: dto.path,
      httpMethod: dto.httpMethod ?? HttpMethod.GET,
      description: dto.description ?? null,
      mapping: dto.mapping ?? null,
      status: EndpointStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.CONNECTOR_ENDPOINTS(dto.connectorId));
    await this.publisher.publishEndpointCreated({
      endpointId: endpoint.id, connectorId: dto.connectorId, code: endpoint.code,
    });
    this.logger.log(`Endpoint created: ${endpoint.code}`);
    return this.repo.findById(endpoint.id);
  }

  async findByConnector(connectorId: string) {
    const cached = await this.redis.get(CACHE_KEYS.CONNECTOR_ENDPOINTS(connectorId));
    if (cached) return JSON.parse(cached);
    const endpoints = await this.repo.findByConnector(connectorId);
    await this.redis.set(CACHE_KEYS.CONNECTOR_ENDPOINTS(connectorId), JSON.stringify(endpoints), 600);
    return endpoints;
  }

  async findById(id: string) {
    const endpoint = await this.repo.findById(id);
    if (!endpoint) throw new ResourceNotFoundException('IntegrationEndpoint', id);
    return endpoint;
  }
}
