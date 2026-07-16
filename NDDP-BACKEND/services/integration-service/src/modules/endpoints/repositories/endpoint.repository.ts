import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationEndpoint } from '../../../database/entities/integration-endpoint.entity';
import { EndpointStatus } from '../../../common/enums';

@Injectable()
export class EndpointRepository {
  constructor(@InjectRepository(IntegrationEndpoint) private readonly repo: Repository<IntegrationEndpoint>) {}

  create(data: Partial<IntegrationEndpoint>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['connector'] }); }
  findByConnectorAndCode(connectorId: string, code: string) {
    return this.repo.findOne({ where: { connectorId, code } });
  }
  findByConnector(connectorId: string) {
    return this.repo.find({ where: { connectorId, status: EndpointStatus.ACTIVE }, order: { name: 'ASC' } });
  }
}
