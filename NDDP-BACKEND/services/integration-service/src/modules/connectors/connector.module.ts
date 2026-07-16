import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationConnector } from '../../database/entities/integration-connector.entity';
import { ConnectorRepository } from './repositories/connector.repository';
import { ConnectorService } from './connector.service';
import { ConnectorController } from './connector.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationConnector]), RedisModule, EventsModule],
  controllers: [ConnectorController],
  providers: [ConnectorRepository, ConnectorService],
  exports: [ConnectorRepository, ConnectorService],
})
export class ConnectorModule {}
