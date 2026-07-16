import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VisitRepository } from './repositories/visit.repository';
import { VisitorRepository } from '../visitors/repositories/visitor.repository';
import { VisitSiteRepository } from '../sites/repositories/visit-site.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateVisitDto, RejectVisitDto } from './dto/visit.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  BusinessRuleViolationException, VisitorBlacklistedException,
} from '../../common/exceptions/visitor.exceptions';
import { VisitStatus, VisitorStatus, SiteStatus } from '../../common/enums';
import { VISIT_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class VisitService {
  private readonly logger = new Logger(VisitService.name);

  constructor(
    private readonly repo: VisitRepository,
    private readonly visitorRepo: VisitorRepository,
    private readonly siteRepo: VisitSiteRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(hostId: string, dto: CreateVisitDto) {
    const visitor = await this.visitorRepo.findById(dto.visitorId);
    if (!visitor) throw new ResourceNotFoundException('Visitor', dto.visitorId);
    if (visitor.status === VisitorStatus.BLACKLISTED) {
      throw new VisitorBlacklistedException('Visitor is blacklisted and cannot request visits');
    }
    if (visitor.status !== VisitorStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Visitor is not active');
    }

    const site = await this.siteRepo.findById(dto.siteId);
    if (!site) throw new ResourceNotFoundException('VisitSite', dto.siteId);
    if (site.status !== SiteStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Visit site is not active');
    }

    const scheduledAt = new Date(dto.scheduledAt);
    if (scheduledAt <= new Date()) {
      throw new BusinessRuleViolationException('Visit must be scheduled in the future');
    }

    if (dto.expectedDeparture) {
      const departure = new Date(dto.expectedDeparture);
      if (departure <= scheduledAt) {
        throw new BusinessRuleViolationException('Expected departure must be after scheduled arrival');
      }
    }

    const visitNumber = `VST-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const visit = await this.repo.create({
      visitNumber,
      visitorId: dto.visitorId,
      siteId: dto.siteId,
      hostId,
      purpose: dto.purpose,
      scheduledAt,
      expectedDeparture: dto.expectedDeparture ? new Date(dto.expectedDeparture) : null,
      status: VisitStatus.PENDING,
    });

    await this.publisher.publishVisitSubmitted({
      visitId: visit.id, visitNumber, visitorId: dto.visitorId, siteId: dto.siteId, hostId, scheduledAt: dto.scheduledAt,
    });
    this.logger.log(`Visit submitted: ${visitNumber}`);
    return this.repo.findById(visit.id);
  }

  async approve(id: string, reviewerId: string) {
    const visit = await this.findById(id);
    this.assertTransition(visit.status, VisitStatus.APPROVED);
    await this.repo.update(id, { status: VisitStatus.APPROVED, reviewerId });
    await this.publisher.publishVisitApproved({
      visitId: id, visitNumber: visit.visitNumber, reviewerId, visitorId: visit.visitorId,
    });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectVisitDto) {
    const visit = await this.findById(id);
    this.assertTransition(visit.status, VisitStatus.REJECTED);
    await this.repo.update(id, { status: VisitStatus.REJECTED, reviewerId, rejectionReason: dto.rejectionReason });
    await this.publisher.publishVisitRejected({
      visitId: id, visitNumber: visit.visitNumber, reason: dto.rejectionReason,
    });
    return this.repo.findById(id);
  }

  async activate(id: string) {
    const visit = await this.findById(id);
    this.assertTransition(visit.status, VisitStatus.ACTIVE);
    await this.repo.update(id, { status: VisitStatus.ACTIVE });
    return this.repo.findById(id);
  }

  async complete(id: string) {
    const visit = await this.findById(id);
    this.assertTransition(visit.status, VisitStatus.COMPLETED);
    await this.repo.update(id, { status: VisitStatus.COMPLETED });
    await this.publisher.publishVisitCompleted({
      visitId: id, visitNumber: visit.visitNumber, visitorId: visit.visitorId,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const visit = await this.findById(id);
    if (!isStaff && visit.hostId !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own visit requests');
    }
    this.assertTransition(visit.status, VisitStatus.CANCELLED);
    await this.repo.update(id, { status: VisitStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: VisitStatus; visitorId?: string; siteId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.visitorId, filter.siteId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, undefined, userId);
  }

  async findPending(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPending(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findById(id: string) {
    const visit = await this.repo.findById(id);
    if (!visit) throw new ResourceNotFoundException('VisitRequest', id);
    return visit;
  }

  private assertTransition(from: VisitStatus, to: VisitStatus) {
    const allowed = VISIT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
