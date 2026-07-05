import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiRoute } from '../../database/entities/api-route.entity';
import { RouteRepository } from './repositories/route.repository';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { ProductModule } from '../products/product.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApiRoute]), ProductModule, RedisModule, EventsModule],
  controllers: [RouteController],
  providers: [RouteRepository, RouteService],
  exports: [RouteRepository, RouteService],
})
export class RouteModule {}
