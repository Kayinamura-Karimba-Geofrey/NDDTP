import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationConnector } from '../../../database/entities/integration-connector.entity';
import { ConnectorStatus } from '../../../common/enums';

@Injectable()
export class ConnectorRepository {
  constructor(@InjectRepository(IntegrationConnector) private readonly repo: Repository<IntegrationConnector>) {}

  create(data: Partial<IntegrationConnector>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<IntegrationConnector>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { status: ConnectorStatus.ACTIVE }, order: { name: 'ASC' } }); }
}
