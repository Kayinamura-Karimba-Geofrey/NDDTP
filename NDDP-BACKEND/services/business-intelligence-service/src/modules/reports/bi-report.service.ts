import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BiReportDefinitionRepository } from './repositories/bi-report-definition.repository';
import { BiReportExecutionRepository } from './repositories/bi-report-execution.repository';
import { SemanticModelRepository } from '../models/repositories/semantic-model.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  CreateBiReportDefinitionDto, CreateBiReportExecutionDto,
  CompleteBiReportExecutionDto, FailBiReportExecutionDto,
} from './dto/bi-report.dto';
import {
  DuplicateResourceException, ResourceNotFoundException,
  InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/bi.exceptions';
import { ModelStatus, ReportDefinitionStatus, ExecutionStatus } from '../../common/enums';
import { EXECUTION_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class BiReportService {
  private readonly logger = new Logger(BiReportService.name);

  constructor(
    private readonly defRepo: BiReportDefinitionRepository,
    private readonly execRepo: BiReportExecutionRepository,
    private readonly modelRepo: SemanticModelRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async createDefinition(dto: CreateBiReportDefinitionDto) {
    const existing = await this.defRepo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const model = await this.modelRepo.findById(dto.modelId);
    if (!model) throw new ResourceNotFoundException('SemanticModel', dto.modelId);
    if (model.status !== ModelStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Semantic model must be active');
    }

    const report = await this.defRepo.create({
      code: dto.code,
      name: dto.name,
      modelId: dto.modelId,
      reportType: dto.reportType,
      layout: dto.layout ?? null,
      description: dto.description ?? null,
      status: ReportDefinitionStatus.ACTIVE,
    });

    await this.publisher.publishReportCreated({ reportId: report.id, code: report.code, modelId: dto.modelId });
    this.logger.log(`BI report definition created: ${report.code}`);
    return this.defRepo.findById(report.id);
  }

  findActiveDefinitions() { return this.defRepo.findActive(); }

  async findDefinitionById(id: string) {
    const report = await this.defRepo.findById(id);
    if (!report) throw new ResourceNotFoundException('BiReportDefinition', id);
    return report;
  }

  async submitExecution(requestedBy: string, dto: CreateBiReportExecutionDto) {
    const report = await this.findDefinitionById(dto.reportId);
    if (report.status !== ReportDefinitionStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Report definition is not active');
    }

    const executionNumber = `BIR-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const execution = await this.execRepo.create({
      executionNumber,
      reportId: dto.reportId,
      requestedBy,
      status: ExecutionStatus.PENDING,
      parameters: dto.parameters ?? null,
    });

    await this.publisher.publishExecutionSubmitted({
      executionId: execution.id, executionNumber, reportId: dto.reportId, requestedBy,
    });
    this.logger.log(`BI report execution submitted: ${executionNumber}`);
    return this.execRepo.findById(execution.id);
  }

  async processExecution(id: string) {
    const execution = await this.findExecutionById(id);
    this.assertTransition(execution.status, ExecutionStatus.PROCESSING);
    await this.execRepo.update(id, { status: ExecutionStatus.PROCESSING });
    await this.publisher.publishExecutionProcessing({ executionId: id, executionNumber: execution.executionNumber });
    return this.execRepo.findById(id);
  }

  async completeExecution(id: string, dto: CompleteBiReportExecutionDto) {
    const execution = await this.findExecutionById(id);
    this.assertTransition(execution.status, ExecutionStatus.COMPLETED);
    await this.execRepo.update(id, { status: ExecutionStatus.COMPLETED, result: dto.result, completedAt: new Date() });
    await this.publisher.publishExecutionCompleted({ executionId: id, executionNumber: execution.executionNumber });
    return this.execRepo.findById(id);
  }

  async failExecution(id: string, dto: FailBiReportExecutionDto) {
    const execution = await this.findExecutionById(id);
    this.assertTransition(execution.status, ExecutionStatus.FAILED);
    await this.execRepo.update(id, { status: ExecutionStatus.FAILED, errorMessage: dto.errorMessage ?? 'Report execution failed' });
    await this.publisher.publishExecutionFailed({ executionId: id, executionNumber: execution.executionNumber, reason: dto.errorMessage });
    return this.execRepo.findById(id);
  }

  async cancelExecution(id: string, userId: string, isStaff = false) {
    const execution = await this.findExecutionById(id);
    if (!isStaff && execution.requestedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own executions');
    }
    this.assertTransition(execution.status, ExecutionStatus.CANCELLED);
    await this.execRepo.update(id, { status: ExecutionStatus.CANCELLED });
    return this.execRepo.findById(id);
  }

  findAllExecutions(filter: { page?: number; limit?: number; status?: ExecutionStatus; reportId?: string }) {
    return this.execRepo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.reportId);
  }

  findMyExecutions(userId: string, page = 1, limit = 20) {
    return this.execRepo.findAll(page, limit, undefined, undefined, userId);
  }

  async findExecutionById(id: string) {
    const execution = await this.execRepo.findById(id);
    if (!execution) throw new ResourceNotFoundException('BiReportExecution', id);
    return execution;
  }

  private assertTransition(from: ExecutionStatus, to: ExecutionStatus) {
    const allowed = EXECUTION_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
