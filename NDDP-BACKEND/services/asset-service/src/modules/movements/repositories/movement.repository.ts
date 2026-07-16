import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetMovement } from '../../../database/entities/asset-movement.entity';

@Injectable()
export class MovementRepository {
  constructor(@InjectRepository(AssetMovement) private readonly repo: Repository<AssetMovement>) {}

  create(data: Partial<AssetMovement>) { return this.repo.save(this.repo.create(data)); }

  findByAsset(assetId: string) {
    return this.repo.find({ where: { assetId }, order: { createdAt: 'DESC' } });
  }
}
