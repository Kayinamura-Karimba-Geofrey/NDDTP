import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationEndpoint } from '../../database/entities/integration-endpoint.entity';
import { EndpointRepository } from './repositories/endpoint.repository';
import { EndpointService } from './endpoint.service';
import { EndpointController } from './endpoint.controller';
import { ConnectorModule } from '../connectors/connector.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationEndpoint]), ConnectorModule, RedisModule, EventsModule],
  controllers: [EndpointController],
  providers: [EndpointRepository, EndpointService],
  exports: [EndpointRepository, EndpointService],
})
export class EndpointModule {}
