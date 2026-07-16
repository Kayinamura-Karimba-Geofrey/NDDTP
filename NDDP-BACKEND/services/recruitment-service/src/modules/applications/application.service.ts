import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CandidateRepository, ApplicationRepository, ApplicationStatusHistoryRepository } from './repositories/application.repository';
import { JobPostingRepository } from '../job-postings/repositories/job-posting.repository';
import { JobPostingService } from '../job-postings/job-posting.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  DuplicateResourceException, ResourceNotFoundException,
  InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/recruitment.exceptions';
import { SubmitApplicationDto, UpdateApplicationStatusDto } from './dto/application.dto';
import { ApplicationStatus, JobPostingStatus } from '../../common/enums';
import { APPLICATION_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class ApplicationService {
  private readonly logger = new Logger(ApplicationService.name);

  constructor(
    private readonly candidateRepo: CandidateRepository,
    private readonly appRepo: ApplicationRepository,
    private readonly historyRepo: ApplicationStatusHistoryRepository,
    private readonly postingRepo: JobPostingRepository,
    private readonly postingService: JobPostingService,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(postingId: string, dto: SubmitApplicationDto, correlationId?: string) {
    const posting = await this.postingRepo.findById(postingId);
    if (!posting) throw new ResourceNotFoundException('JobPosting', postingId);
    if (posting.status !== JobPostingStatus.PUBLISHED) {
      throw new BusinessRuleViolationException('Job posting is not accepting applications');
    }
    if (posting.closingDate && new Date(posting.closingDate) < new Date()) {
      throw new BusinessRuleViolationException('Application deadline has passed');
    }

    let candidate = await this.candidateRepo.findByEmail(dto.email);
    if (!candidate) {
      candidate = await this.candidateRepo.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email.toLowerCase(),
        phone: dto.phone ?? null,
        nationalId: dto.nationalId ?? null,
        resumeUrl: dto.resumeUrl ?? null,
      });
    }

    const existing = await this.appRepo.findByPostingAndCandidate(postingId, candidate.id);
    if (existing) throw new DuplicateResourceException('application', `${postingId}:${candidate.id}`);

    const applicationNumber = `APP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const application = await this.appRepo.create({
      jobPostingId: postingId,
      candidateId: candidate.id,
      applicationNumber,
      coverLetter: dto.coverLetter ?? null,
      status: ApplicationStatus.SUBMITTED,
      submittedAt: new Date(),
    });

    await this.historyRepo.create({
      applicationId: application.id,
      fromStatus: null,
      toStatus: ApplicationStatus.SUBMITTED,
      notes: 'Application submitted',
    });

    await this.publisher.publishApplicationSubmitted({
      applicationId: application.id,
      applicationNumber,
      jobPostingId: postingId,
      candidateId: candidate.id,
      candidateEmail: candidate.email,
      jobTitle: posting.title,
    }, correlationId);

    this.logger.log(`Application ${applicationNumber} submitted for posting ${postingId}`);
    return this.appRepo.findById(application.id);
  }

  findAll(filter: { page?: number; limit?: number; status?: ApplicationStatus; jobPostingId?: string; candidateId?: string }) {
    return this.appRepo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.jobPostingId, filter.candidateId);
  }

  async findById(id: string) {
    const app = await this.appRepo.findById(id);
    if (!app) throw new ResourceNotFoundException('Application', id);
    return app;
  }

  async updateStatus(id: string, dto: UpdateApplicationStatusDto, changedBy?: string, correlationId?: string) {
    const app = await this.findById(id);
    const allowed = APPLICATION_STATUS_TRANSITIONS[app.status] || [];
    if (!allowed.includes(dto.status)) {
      throw new InvalidStatusTransitionException(app.status, dto.status);
    }

    const updateData: Record<string, unknown> = { status: dto.status };
    if (dto.rejectionReason) updateData.rejectionReason = dto.rejectionReason;
    if (dto.status === ApplicationStatus.HIRED) updateData.hiredAt = new Date();

    await this.appRepo.update(id, updateData);
    await this.historyRepo.create({
      applicationId: id,
      fromStatus: app.status,
      toStatus: dto.status,
      notes: dto.notes ?? null,
      changedBy: changedBy ?? null,
    });

    await this.publisher.publishApplicationStatusChanged({
      applicationId: id,
      applicationNumber: app.applicationNumber,
      fromStatus: app.status,
      toStatus: dto.status,
      candidateId: app.candidateId,
      jobPostingId: app.jobPostingId,
    }, correlationId);

    if (dto.status === ApplicationStatus.HIRED) {
      await this.postingService.incrementFilled(app.jobPostingId);
      await this.publisher.publishApplicationHired({
        applicationId: id,
        applicationNumber: app.applicationNumber,
        candidateId: app.candidateId,
        candidateEmail: app.candidate?.email,
        jobPostingId: app.jobPostingId,
        jobTitle: app.jobPosting?.title,
      }, correlationId);
    }

    return this.findById(id);
  }

  getPipelineStats() {
    return this.appRepo.countByStatus();
  }
}
