import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../../database/entities/asset.entity';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AssetRepository } from './repositories/asset.repository';
import { CategoryModule } from '../categories/category.module';
import { MovementModule } from '../movements/movement.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), CategoryModule, MovementModule, EventsModule],
  controllers: [AssetController],
  providers: [AssetService, AssetRepository],
  exports: [AssetRepository],
})
export class AssetModule {}
