import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiProduct } from '../../database/entities/api-product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApiProduct]), RedisModule, EventsModule],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
