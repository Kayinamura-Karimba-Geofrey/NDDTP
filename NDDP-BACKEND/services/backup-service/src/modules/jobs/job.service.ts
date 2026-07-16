import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JobRepository } from './repositories/job.repository';
import { PolicyRepository } from '../policies/repositories/policy.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateJobDto, FailJobDto, CompleteJobDto } from './dto/job.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/backup.exceptions';
import { PolicyStatus, JobStatus } from '../../common/enums';
import { JOB_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(
    private readonly repo: JobRepository,
    private readonly policyRepo: PolicyRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(initiatedBy: string, dto: CreateJobDto) {
    const policy = await this.policyRepo.findById(dto.policyId);
    if (!policy) throw new ResourceNotFoundException('BackupPolicy', dto.policyId);
    if (policy.status !== PolicyStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Backup policy is not active');
    }

    const jobNumber = `BKP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const job = await this.repo.create({
      jobNumber,
      policyId: dto.policyId,
      initiatedBy,
      status: JobStatus.PENDING,
    });

    await this.publisher.publishJobSubmitted({
      jobId: job.id, jobNumber, policyId: dto.policyId, initiatedBy,
    });
    this.logger.log(`Backup job submitted: ${jobNumber}`);
    return this.repo.findById(job.id);
  }

  async start(id: string) {
    const job = await this.findById(id);
    this.assertTransition(job.status, JobStatus.RUNNING);
    await this.repo.update(id, { status: JobStatus.RUNNING, startedAt: new Date() });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteJobDto) {
    const job = await this.findById(id);
    this.assertTransition(job.status, JobStatus.COMPLETED);
    const backupPath = dto.backupPath ?? `/backups/${job.jobNumber}.tar.gz`;
    await this.repo.update(id, {
      status: JobStatus.COMPLETED,
      backupPath,
      sizeBytes: dto.sizeBytes != null ? String(dto.sizeBytes) : null,
      completedAt: new Date(),
    });
    await this.publisher.publishJobCompleted({
      jobId: id, jobNumber: job.jobNumber, backupPath, sizeBytes: dto.sizeBytes ?? 0,
    });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailJobDto) {
    const job = await this.findById(id);
    this.assertTransition(job.status, JobStatus.FAILED);
    const errorMessage = dto.errorMessage ?? 'Backup job failed';
    await this.repo.update(id, { status: JobStatus.FAILED, errorMessage, completedAt: new Date() });
    await this.publisher.publishJobFailed({ jobId: id, jobNumber: job.jobNumber, reason: errorMessage });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const job = await this.findById(id);
    if (!isStaff && job.initiatedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own backup jobs');
    }
    this.assertTransition(job.status, JobStatus.CANCELLED);
    await this.repo.update(id, { status: JobStatus.CANCELLED, completedAt: new Date() });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: JobStatus; policyId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.policyId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const job = await this.repo.findById(id);
    if (!job) throw new ResourceNotFoundException('BackupJob', id);
    return job;
  }

  private assertTransition(from: JobStatus, to: JobStatus) {
    const allowed = JOB_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
