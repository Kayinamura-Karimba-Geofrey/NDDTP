import { Injectable, Logger } from '@nestjs/common';
import { AssignmentRepository } from './repositories/assignment.repository';
import { AssetRepository } from '../assets/repositories/asset.repository';
import { MovementRepository } from '../movements/repositories/movement.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/asset.exceptions';
import { AssignAssetDto, ReturnAssetDto } from './dto/assignment.dto';
import { AssetStatus, AssignmentStatus, MovementType } from '../../common/enums';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger(AssignmentService.name);

  constructor(
    private readonly repo: AssignmentRepository,
    private readonly assetRepo: AssetRepository,
    private readonly movementRepo: MovementRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async assign(assignedBy: string, dto: AssignAssetDto) {
    const asset = await this.assetRepo.findById(dto.assetId);
    if (!asset) throw new ResourceNotFoundException('Asset', dto.assetId);
    if (asset.status !== AssetStatus.AVAILABLE) {
      throw new BusinessRuleViolationException('Only available assets can be assigned');
    }

    const active = await this.repo.findActiveByAsset(dto.assetId);
    if (active) throw new BusinessRuleViolationException('Asset already has an active assignment');

    const assignment = await this.repo.create({
      assetId: dto.assetId,
      userId: dto.userId,
      unitId: dto.unitId ?? asset.unitId,
      assignedBy,
      assignedAt: new Date(),
      notes: dto.notes ?? null,
      status: AssignmentStatus.ACTIVE,
    });

    await this.assetRepo.update(dto.assetId, { status: AssetStatus.ASSIGNED });
    await this.movementRepo.create({
      assetId: dto.assetId,
      movementType: MovementType.ASSIGNMENT,
      toUserId: dto.userId,
      toUnitId: dto.unitId ?? null,
      movedBy: assignedBy,
      notes: dto.notes ?? null,
    });

    await this.publisher.publishAssetAssigned({
      assignmentId: assignment.id, assetId: dto.assetId, userId: dto.userId, assignedBy,
    });

    this.logger.log(`Asset ${dto.assetId} assigned to ${dto.userId}`);
    return assignment;
  }

  async return(assetId: string, returnedBy: string, dto: ReturnAssetDto) {
    const assignment = await this.repo.findActiveByAsset(assetId);
    if (!assignment) throw new ResourceNotFoundException('ActiveAssignment', assetId);

    await this.repo.update(assignment.id, { status: AssignmentStatus.RETURNED, returnedAt: new Date() });
    await this.assetRepo.update(assetId, { status: AssetStatus.AVAILABLE });
    await this.movementRepo.create({
      assetId,
      movementType: MovementType.RETURN,
      fromUserId: assignment.userId,
      movedBy: returnedBy,
      notes: dto.notes ?? null,
    });

    await this.publisher.publishAssetReturned({ assetId, userId: assignment.userId, returnedBy });
    return this.repo.findByAsset(assetId);
  }

  findByAsset(assetId: string) {
    return this.repo.findByAsset(assetId);
  }

  findByUser(userId: string) {
    return this.repo.findByUser(userId);
  }
}
