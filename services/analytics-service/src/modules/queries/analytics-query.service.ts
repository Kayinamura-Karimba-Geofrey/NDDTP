import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsQueryRepository } from './repositories/analytics-query.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateAnalyticsQueryDto, CompleteAnalyticsQueryDto, FailAnalyticsQueryDto } from './dto/analytics-query.dto';
import { ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException } from '../../common/exceptions/analytics.exceptions';
import { QueryStatus } from '../../common/enums';
import { QUERY_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class AnalyticsQueryService {
  private readonly logger = new Logger(AnalyticsQueryService.name);

  constructor(
    private readonly repo: AnalyticsQueryRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(requestedBy: string, dto: CreateAnalyticsQueryDto) {
    const queryNumber = `ANL-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const query = await this.repo.create({
      queryNumber,
      requestedBy,
      status: QueryStatus.PENDING,
      parameters: dto.parameters ?? null,
    });

    await this.publisher.publishQuerySubmitted({ queryId: query.id, queryNumber, requestedBy });
    this.logger.log(`Analytics query submitted: ${queryNumber}`);
    return this.repo.findById(query.id);
  }

  async process(id: string) {
    const query = await this.findById(id);
    this.assertTransition(query.status, QueryStatus.PROCESSING);
    await this.repo.update(id, { status: QueryStatus.PROCESSING });
    await this.publisher.publishQueryProcessing({ queryId: id, queryNumber: query.queryNumber });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteAnalyticsQueryDto) {
    const query = await this.findById(id);
    this.assertTransition(query.status, QueryStatus.COMPLETED);
    await this.repo.update(id, { status: QueryStatus.COMPLETED, result: dto.result, completedAt: new Date() });
    await this.publisher.publishQueryCompleted({ queryId: id, queryNumber: query.queryNumber });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailAnalyticsQueryDto) {
    const query = await this.findById(id);
    this.assertTransition(query.status, QueryStatus.FAILED);
    await this.repo.update(id, { status: QueryStatus.FAILED, errorMessage: dto.errorMessage ?? 'Query execution failed' });
    await this.publisher.publishQueryFailed({ queryId: id, queryNumber: query.queryNumber, reason: dto.errorMessage });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const query = await this.findById(id);
    if (!isStaff && query.requestedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own queries');
    }
    this.assertTransition(query.status, QueryStatus.CANCELLED);
    await this.repo.update(id, { status: QueryStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: QueryStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findById(id: string) {
    const query = await this.repo.findById(id);
    if (!query) throw new ResourceNotFoundException('AnalyticsQuery', id);
    return query;
  }

  private assertTransition(from: QueryStatus, to: QueryStatus) {
    const allowed = QUERY_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
