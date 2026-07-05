import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiDataset } from '../../database/entities/bi-dataset.entity';
import { BiDatasetRepository } from './repositories/dataset.repository';
import { BiDatasetService } from './dataset.service';
import { BiDatasetController } from './dataset.controller';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([BiDataset]), RedisModule, EventsModule],
  controllers: [BiDatasetController],
  providers: [BiDatasetRepository, BiDatasetService],
  exports: [BiDatasetRepository, BiDatasetService],
})
export class BiDatasetModule {}
