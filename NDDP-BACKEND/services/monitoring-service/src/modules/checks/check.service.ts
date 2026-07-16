import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CheckRepository } from './repositories/check.repository';
import { TargetRepository } from '../targets/repositories/target.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateCheckDto, FailCheckDto, PassCheckDto } from './dto/check.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/monitoring.exceptions';
import { TargetStatus, CheckStatus } from '../../common/enums';
import { CHECK_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class CheckService {
  private readonly logger = new Logger(CheckService.name);

  constructor(
    private readonly repo: CheckRepository,
    private readonly targetRepo: TargetRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(initiatedBy: string, dto: CreateCheckDto) {
    const target = await this.targetRepo.findById(dto.targetId);
    if (!target) throw new ResourceNotFoundException('MonitoringTarget', dto.targetId);
    if (target.status !== TargetStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Monitoring target is not active');
    }

    const checkNumber = `CHK-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const check = await this.repo.create({
      checkNumber,
      targetId: dto.targetId,
      initiatedBy,
      status: CheckStatus.PENDING,
    });

    await this.publisher.publishCheckSubmitted({
      checkId: check.id, checkNumber, targetId: dto.targetId, initiatedBy,
    });
    this.logger.log(`Health check submitted: ${checkNumber}`);
    return this.repo.findById(check.id);
  }

  async start(id: string) {
    const check = await this.findById(id);
    this.assertTransition(check.status, CheckStatus.RUNNING);
    await this.repo.update(id, { status: CheckStatus.RUNNING, startedAt: new Date() });
    return this.repo.findById(id);
  }

  async pass(id: string, dto: PassCheckDto) {
    const check = await this.findById(id);
    this.assertTransition(check.status, CheckStatus.PASSED);
    await this.repo.update(id, {
      status: CheckStatus.PASSED,
      responseTimeMs: dto.responseTimeMs ?? null,
      statusCode: dto.statusCode ?? 200,
      completedAt: new Date(),
    });
    await this.publisher.publishCheckPassed({
      checkId: id, checkNumber: check.checkNumber, targetId: check.targetId,
      responseTimeMs: dto.responseTimeMs ?? 0,
    });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailCheckDto) {
    const check = await this.findById(id);
    this.assertTransition(check.status, CheckStatus.FAILED);
    const errorMessage = dto.errorMessage ?? 'Health check failed';
    await this.repo.update(id, {
      status: CheckStatus.FAILED,
      statusCode: dto.statusCode ?? null,
      errorMessage,
      completedAt: new Date(),
    });
    await this.publisher.publishCheckFailed({
      checkId: id, checkNumber: check.checkNumber, targetId: check.targetId, reason: errorMessage,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const check = await this.findById(id);
    if (!isStaff && check.initiatedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own health checks');
    }
    this.assertTransition(check.status, CheckStatus.CANCELLED);
    await this.repo.update(id, { status: CheckStatus.CANCELLED, completedAt: new Date() });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: CheckStatus; targetId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.targetId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const check = await this.repo.findById(id);
    if (!check) throw new ResourceNotFoundException('MonitoringCheck', id);
    return check;
  }

  private assertTransition(from: CheckStatus, to: CheckStatus) {
    const allowed = CHECK_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
