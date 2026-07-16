import { Injectable } from '@nestjs/common';
import { MovementRepository } from './repositories/movement.repository';
import { ResourceNotFoundException } from '../../common/exceptions/asset.exceptions';
import { AssetRepository } from '../assets/repositories/asset.repository';

@Injectable()
export class MovementService {
  constructor(
    private readonly repo: MovementRepository,
    private readonly assetRepo: AssetRepository,
  ) {}

  async findByAsset(assetId: string) {
    const asset = await this.assetRepo.findById(assetId);
    if (!asset) throw new ResourceNotFoundException('Asset', assetId);
    return this.repo.findByAsset(assetId);
  }
}
