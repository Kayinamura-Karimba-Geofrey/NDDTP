import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JobRepository } from './repositories/job.repository';
import { JobLogRepository } from './repositories/job-log.repository';
import { ConnectorRepository } from '../connectors/repositories/connector.repository';
import { EndpointRepository } from '../endpoints/repositories/endpoint.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateJobDto, FailJobDto, CompleteJobDto, AppendJobLogDto } from './dto/job.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/integration.exceptions';
import { ConnectorStatus, EndpointStatus, JobStatus, LogLevel } from '../../common/enums';
import { JOB_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(
    private readonly repo: JobRepository,
    private readonly logRepo: JobLogRepository,
    private readonly connectorRepo: ConnectorRepository,
    private readonly endpointRepo: EndpointRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(submittedBy: string, dto: CreateJobDto) {
    const connector = await this.connectorRepo.findById(dto.connectorId);
    if (!connector) throw new ResourceNotFoundException('IntegrationConnector', dto.connectorId);
    if (connector.status !== ConnectorStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Connector is not active');
    }

    const endpoint = await this.endpointRepo.findById(dto.endpointId);
    if (!endpoint) throw new ResourceNotFoundException('IntegrationEndpoint', dto.endpointId);
    if (endpoint.connectorId !== dto.connectorId) {
      throw new BusinessRuleViolationException('Endpoint does not belong to the specified connector');
    }
    if (endpoint.status !== EndpointStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Endpoint is not active');
    }

    const jobNumber = `INT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const job = await this.repo.create({
      jobNumber,
      connectorId: dto.connectorId,
      endpointId: dto.endpointId,
      submittedBy,
      status: JobStatus.PENDING,
      payload: dto.payload ?? null,
    });

    await this.logRepo.create({ jobId: job.id, level: LogLevel.INFO, message: 'Job submitted' });
    await this.publisher.publishJobSubmitted({
      jobId: job.id, jobNumber, connectorId: dto.connectorId, endpointId: dto.endpointId, submittedBy,
    });
    this.logger.log(`Integration job submitted: ${jobNumber}`);
    return this.repo.findById(job.id);
  }

  async start(id: string) {
    const job = await this.findById(id);
    this.assertTransition(job.status, JobStatus.RUNNING);
    await this.repo.update(id, { status: JobStatus.RUNNING, startedAt: new Date() });
    await this.logRepo.create({ jobId: id, level: LogLevel.INFO, message: 'Job started' });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteJobDto) {
    const job = await this.findById(id);
    this.assertTransition(job.status, JobStatus.COMPLETED);
    await this.repo.update(id, { status: JobStatus.COMPLETED, completedAt: new Date() });
    await this.logRepo.create({
      jobId: id,
      level: LogLevel.INFO,
      message: 'Job completed',
      metadata: dto.result ?? null,
    });
    await this.publisher.publishJobCompleted({
      jobId: id, jobNumber: job.jobNumber, connectorId: job.connectorId, endpointId: job.endpointId,
    });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailJobDto) {
    const job = await this.findById(id);
    this.assertTransition(job.status, JobStatus.FAILED);
    const errorMessage = dto.errorMessage ?? 'Integration job failed';
    await this.repo.update(id, { status: JobStatus.FAILED, errorMessage, completedAt: new Date() });
    await this.logRepo.create({ jobId: id, level: LogLevel.ERROR, message: errorMessage });
    await this.publisher.publishJobFailed({
      jobId: id, jobNumber: job.jobNumber, reason: errorMessage,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const job = await this.findById(id);
    if (!isStaff && job.submittedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own integration jobs');
    }
    this.assertTransition(job.status, JobStatus.CANCELLED);
    await this.repo.update(id, { status: JobStatus.CANCELLED, completedAt: new Date() });
    await this.logRepo.create({ jobId: id, level: LogLevel.WARN, message: 'Job cancelled' });
    return this.repo.findById(id);
  }

  async appendLog(id: string, dto: AppendJobLogDto) {
    await this.findById(id);
    return this.logRepo.create({
      jobId: id,
      level: LogLevel.INFO,
      message: dto.message,
      metadata: dto.metadata ?? null,
    });
  }

  findAll(filter: { page?: number; limit?: number; status?: JobStatus; connectorId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.connectorId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const job = await this.repo.findById(id);
    if (!job) throw new ResourceNotFoundException('IntegrationJob', id);
    return job;
  }

  async findLogs(id: string) {
    await this.findById(id);
    return this.logRepo.findByJobId(id);
  }

  private assertTransition(from: JobStatus, to: JobStatus) {
    const allowed = JOB_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
