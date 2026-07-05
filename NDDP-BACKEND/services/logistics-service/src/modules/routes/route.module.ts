import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportRoute } from '../../database/entities/transport-route.entity';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { RouteRepository } from './repositories/route.repository';
import { LocationModule } from '../locations/location.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransportRoute]), LocationModule, EventsModule],
  controllers: [RouteController],
  providers: [RouteService, RouteRepository],
  exports: [RouteRepository, RouteService],
})
export class RouteModule {}
