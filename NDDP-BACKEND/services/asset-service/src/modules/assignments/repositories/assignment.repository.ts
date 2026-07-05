import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetAssignment } from '../../../database/entities/asset-assignment.entity';
import { AssignmentStatus } from '../../../common/enums';

@Injectable()
export class AssignmentRepository {
  constructor(@InjectRepository(AssetAssignment) private readonly repo: Repository<AssetAssignment>) {}

  create(data: Partial<AssetAssignment>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<AssetAssignment>) { return this.repo.update(id, data as Record<string, unknown>); }

  findActiveByAsset(assetId: string) {
    return this.repo.findOne({ where: { assetId, status: AssignmentStatus.ACTIVE } });
  }

  findByAsset(assetId: string) {
    return this.repo.find({ where: { assetId }, order: { assignedAt: 'DESC' } });
  }

  findByUser(userId: string) {
    return this.repo.find({ where: { userId, status: AssignmentStatus.ACTIVE }, relations: ['asset', 'asset.category'] });
  }
}
