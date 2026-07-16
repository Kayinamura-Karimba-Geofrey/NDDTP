import { Injectable, Logger } from '@nestjs/common';
import { CheckInRepository } from './repositories/check-in.repository';
import { VisitRepository } from '../visits/repositories/visit.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RecordCheckInDto } from './dto/check-in.dto';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/visitor.exceptions';
import { VisitStatus, CheckInType } from '../../common/enums';

@Injectable()
export class CheckInService {
  private readonly logger = new Logger(CheckInService.name);

  constructor(
    private readonly repo: CheckInRepository,
    private readonly visitRepo: VisitRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async record(recordedBy: string, dto: RecordCheckInDto) {
    const visit = await this.visitRepo.findById(dto.visitId);
    if (!visit) throw new ResourceNotFoundException('VisitRequest', dto.visitId);

    if (dto.checkType === CheckInType.CHECK_IN) {
      if (visit.status !== VisitStatus.APPROVED) {
        throw new BusinessRuleViolationException('Only APPROVED visits can be checked in');
      }
      const existing = await this.repo.findLatestByVisitAndType(dto.visitId, CheckInType.CHECK_IN);
      const lastOut = await this.repo.findLatestByVisitAndType(dto.visitId, CheckInType.CHECK_OUT);
      if (existing && (!lastOut || lastOut.recordedAt < existing.recordedAt)) {
        throw new BusinessRuleViolationException('Visitor is already checked in');
      }
      await this.visitRepo.update(dto.visitId, { status: VisitStatus.ACTIVE });
    } else {
      if (visit.status !== VisitStatus.ACTIVE) {
        throw new BusinessRuleViolationException('Only ACTIVE (checked-in) visits can be checked out');
      }
      const lastIn = await this.repo.findLatestByVisitAndType(dto.visitId, CheckInType.CHECK_IN);
      if (!lastIn) throw new BusinessRuleViolationException('No check-in record found for this visit');
      await this.visitRepo.update(dto.visitId, { status: VisitStatus.COMPLETED });
      await this.publisher.publishVisitCompleted({
        visitId: dto.visitId, visitNumber: visit.visitNumber, visitorId: visit.visitorId,
      });
    }

    const log = await this.repo.create({
      visitId: dto.visitId,
      siteId: visit.siteId,
      checkType: dto.checkType,
      recordedBy,
      notes: dto.notes ?? null,
    });

    await this.publisher.publishCheckinRecorded({
      checkInId: log.id, visitId: dto.visitId, checkType: dto.checkType, siteId: visit.siteId,
    });
    this.logger.log(`${dto.checkType} recorded for visit ${visit.visitNumber}`);
    return log;
  }

  findByVisitId(visitId: string) {
    return this.repo.findByVisitId(visitId);
  }
}
