import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RestoreRepository } from './repositories/restore.repository';
import { JobRepository } from '../jobs/repositories/job.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateRestoreDto, FailRestoreDto, CompleteRestoreDto } from './dto/restore.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/backup.exceptions';
import { JobStatus, RestoreStatus } from '../../common/enums';
import { RESTORE_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class RestoreService {
  private readonly logger = new Logger(RestoreService.name);

  constructor(
    private readonly repo: RestoreRepository,
    private readonly jobRepo: JobRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(requestedBy: string, dto: CreateRestoreDto) {
    const job = await this.jobRepo.findById(dto.jobId);
    if (!job) throw new ResourceNotFoundException('BackupJob', dto.jobId);
    if (job.status !== JobStatus.COMPLETED) {
      throw new BusinessRuleViolationException('Can only restore from completed backup jobs');
    }
    if (!job.backupPath) {
      throw new BusinessRuleViolationException('Backup job has no backup path');
    }

    const restoreNumber = `RST-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const restore = await this.repo.create({
      restoreNumber,
      jobId: dto.jobId,
      requestedBy,
      status: RestoreStatus.PENDING,
      targetPath: dto.targetPath ?? null,
    });

    await this.publisher.publishRestoreSubmitted({
      restoreId: restore.id, restoreNumber, jobId: dto.jobId, requestedBy,
    });
    this.logger.log(`Restore submitted: ${restoreNumber}`);
    return this.repo.findById(restore.id);
  }

  async start(id: string) {
    const restore = await this.findById(id);
    this.assertTransition(restore.status, RestoreStatus.RUNNING);
    await this.repo.update(id, { status: RestoreStatus.RUNNING, startedAt: new Date() });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteRestoreDto) {
    const restore = await this.findById(id);
    this.assertTransition(restore.status, RestoreStatus.COMPLETED);
    const targetPath = dto.targetPath ?? restore.targetPath ?? `/restores/${restore.restoreNumber}`;
    await this.repo.update(id, { status: RestoreStatus.COMPLETED, targetPath, completedAt: new Date() });
    await this.publisher.publishRestoreCompleted({
      restoreId: id, restoreNumber: restore.restoreNumber, jobId: restore.jobId, targetPath,
    });
    return this.repo.findById(id);
  }

  async fail(id: string, dto: FailRestoreDto) {
    const restore = await this.findById(id);
    this.assertTransition(restore.status, RestoreStatus.FAILED);
    const errorMessage = dto.errorMessage ?? 'Restore operation failed';
    await this.repo.update(id, { status: RestoreStatus.FAILED, errorMessage, completedAt: new Date() });
    await this.publisher.publishRestoreFailed({
      restoreId: id, restoreNumber: restore.restoreNumber, reason: errorMessage,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, isStaff = false) {
    const restore = await this.findById(id);
    if (!isStaff && restore.requestedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own restore requests');
    }
    this.assertTransition(restore.status, RestoreStatus.CANCELLED);
    await this.repo.update(id, { status: RestoreStatus.CANCELLED, completedAt: new Date() });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: RestoreStatus; jobId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.jobId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findById(id: string) {
    const restore = await this.repo.findById(id);
    if (!restore) throw new ResourceNotFoundException('BackupRestore', id);
    return restore;
  }

  private assertTransition(from: RestoreStatus, to: RestoreStatus) {
    const allowed = RESTORE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
