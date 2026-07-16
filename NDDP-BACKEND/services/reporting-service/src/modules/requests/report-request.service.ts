import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ReportRequestRepository } from './repositories/report-request.repository';
import { ReportOutputRepository } from './repositories/report-output.repository';
import { ReportDefinitionRepository } from '../definitions/repositories/report-definition.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateReportRequestDto, FailReportRequestDto, CompleteReportRequestDto } from './dto/report-request.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/reporting.exceptions';
import { RequestStatus, DefinitionStatus, OutputFormat, OutputStatus } from '../../common/enums';
import { REQUEST_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class ReportRequestService {
  private readonly logger = new Logger(ReportRequestService.name);

  constructor(
    private readonly repo: ReportRequestRepository,
    private readonly outputRepo: ReportOutputRepository,
    private readonly defRepo: ReportDefinitionRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(requestedBy: string, dto: CreateReportRequestDto) {
    const definition = await this.defRepo.findById(dto.definitionId);
    if (!definition) throw new ResourceNotFoundException('ReportDefinition', dto.definitionId);
    if (definition.status !== DefinitionStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Report definition is not active');
    }

    const requestNumber = `RPT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const request = await this.repo.create({
      requestNumber,
      definitionId: dto.definitionId,
      requestedBy,
      scheduleId: dto.scheduleId ?? null,
      status: RequestStatus.PENDING,
      parameters: dto.parameters ?? null,
    });

    await this.publisher.publishRequestSubmitted({
      requestId: request.id, requestNumber, definitionId: dto.definitionId, requestedBy,
    });
    this.logger.log(`Report request submitted: ${requestNumber}`);
    return this.repo.findById(request.id);
  }

  async process(id: string) {
    const request = await this.findById(id);
    this.assertTransition(request.status, RequestStatus.PROCESSING);
    await this.repo.update(id, { status: RequestStatus.PROCESSING });
    await this.publisher.publishRequestProcessing({ requestId: id, requestNumber: request.requestNumber });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteReportRequestDto) {
    const request = await this.findById(id);
    this.assertTransition(request.status, RequestStatus.COMPLETED);

    const outputFormat = request.definition?.outputFormat ?? OutputFormat.PDF;
    const filePath = dto.filePath ?? `/reports/${request.requestNumber}.${outputFormat.toLowerCase()}`;

    await this.outputRepo.create({
      requestId: id,
      outputFormat,
      filePath,
      recordCount: dto.recordCount ?? 0,
      status: OutputStatus.GENERATED,
      generatedAt: new Date(),
    });

    await this.repo.update(id, { status: RequestStatus.COMPLETED, completedAt: new Date() });
    await this.publisher.publishRequestCompleted({
      requestId: id, requestNumber: request.requestNumber, filePath, recordCount: dto.recordCount ?? 0,
    });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailReportRequestDto) {
    const request = await this.findById(id);
    this.assertTransition(request.status, RequestStatus.FAILED);
    await this.repo.update(id, { status: RequestStatus.FAILED, errorMessage: dto.errorMessage ?? 'Report generation failed' });
    await this.publisher.publishRequestFailed({
      requestId: id, requestNumber: request.requestNumber, reason: dto.errorMessage,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const request = await this.findById(id);
    if (!isStaff && request.requestedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own report requests');
    }
    this.assertTransition(request.status, RequestStatus.CANCELLED);
    await this.repo.update(id, { status: RequestStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: RequestStatus; definitionId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.definitionId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const request = await this.repo.findById(id);
    if (!request) throw new ResourceNotFoundException('ReportRequest', id);
    return request;
  }

  async findOutputs(id: string) {
    await this.findById(id);
    return this.outputRepo.findByRequestId(id);
  }

  private assertTransition(from: RequestStatus, to: RequestStatus) {
    const allowed = REQUEST_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
