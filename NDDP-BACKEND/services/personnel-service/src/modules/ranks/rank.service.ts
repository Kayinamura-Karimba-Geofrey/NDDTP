import { Injectable } from '@nestjs/common';
import { RankRepository, RankHistoryRepository } from './repositories/rank.repository';
import { PersonnelRecordRepository } from '../personnel/repositories/personnel-record.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/personnel.exceptions';
import { CreateRankDto, PromotePersonnelDto } from './dto/rank.dto';
import { ServiceEventType } from '../../common/enums';
import { ServiceHistoryRepository } from '../personnel/repositories/service-history.repository';

@Injectable()
export class RankService {
  constructor(
    private readonly rankRepo: RankRepository,
    private readonly historyRepo: RankHistoryRepository,
    private readonly personnelRepo: PersonnelRecordRepository,
    private readonly serviceHistoryRepo: ServiceHistoryRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  create(dto: CreateRankDto) { return this.rankRepo.create(dto); }
  findAll() { return this.rankRepo.findAll(); }

  async promote(personnelId: string, dto: PromotePersonnelDto, promotedBy?: string, correlationId?: string) {
    const personnel = await this.personnelRepo.findById(personnelId);
    if (!personnel) throw new ResourceNotFoundException('PersonnelRecord', personnelId);

    const rank = await this.rankRepo.findById(dto.rankId);
    if (!rank) throw new ResourceNotFoundException('Rank', dto.rankId);

    const current = personnel.rankHistory?.find((rh) => rh.isCurrent);
    if (current && current.rank && rank.level <= current.rank.level) {
      throw new BusinessRuleViolationException('New rank must be higher than current rank');
    }

    await this.historyRepo.endCurrent(personnelId, dto.effectiveDate);
    const entry = await this.historyRepo.create({
      personnelRecordId: personnelId,
      rankId: dto.rankId,
      effectiveDate: dto.effectiveDate,
      orderNumber: dto.orderNumber ?? null,
      isCurrent: true,
      promotedBy: promotedBy ?? null,
      notes: dto.notes ?? null,
    });

    await this.serviceHistoryRepo.create({
      personnelRecordId: personnelId,
      eventType: ServiceEventType.PROMOTION,
      title: `Promoted to ${rank.name}`,
      eventDate: dto.effectiveDate,
      referenceNumber: dto.orderNumber ?? null,
      recordedBy: promotedBy ?? null,
    });

    await this.publisher.publishRankPromoted({
      personnelId, userId: personnel.userId, rankId: rank.id, rankCode: rank.code, rankName: rank.name,
    }, correlationId);

    return entry;
  }

  getHistory(personnelId: string) {
    return this.historyRepo.findByPersonnel(personnelId);
  }
}
