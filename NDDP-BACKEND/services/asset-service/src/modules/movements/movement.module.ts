import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetMovement } from '../../database/entities/asset-movement.entity';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { MovementRepository } from './repositories/movement.repository';
import { AssetModule } from '../assets/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetMovement]), AssetModule],
  controllers: [MovementController],
  providers: [MovementService, MovementRepository],
  exports: [MovementRepository],
})
export class MovementModule {}
