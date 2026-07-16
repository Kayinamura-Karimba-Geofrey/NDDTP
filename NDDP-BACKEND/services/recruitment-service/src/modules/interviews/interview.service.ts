import { Injectable } from '@nestjs/common';
import { InterviewRepository } from './repositories/interview.repository';
import { ApplicationRepository } from '../applications/repositories/application.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/recruitment.exceptions';
import { ScheduleInterviewDto, CompleteInterviewDto } from './dto/interview.dto';
import { InterviewStatus, ApplicationStatus } from '../../common/enums';

@Injectable()
export class InterviewService {
  constructor(
    private readonly repo: InterviewRepository,
    private readonly appRepo: ApplicationRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async schedule(applicationId: string, dto: ScheduleInterviewDto, scheduledBy?: string, correlationId?: string) {
    const app = await this.appRepo.findById(applicationId);
    if (!app) throw new ResourceNotFoundException('Application', applicationId);
    if (![ApplicationStatus.SCREENING, ApplicationStatus.INTERVIEW].includes(app.status)) {
      throw new BusinessRuleViolationException('Interviews can only be scheduled for applications in SCREENING or INTERVIEW status');
    }

    const interview = await this.repo.create({
      applicationId,
      type: dto.type,
      scheduledAt: new Date(dto.scheduledAt),
      durationMinutes: dto.durationMinutes ?? 60,
      location: dto.location ?? null,
      interviewerIds: dto.interviewerIds ?? null,
      notes: dto.notes ?? null,
      scheduledBy: scheduledBy ?? null,
    });

    if (app.status === ApplicationStatus.SCREENING) {
      await this.appRepo.update(applicationId, { status: ApplicationStatus.INTERVIEW });
    }

    await this.publisher.publishInterviewScheduled({
      interviewId: interview.id,
      applicationId,
      applicationNumber: app.applicationNumber,
      scheduledAt: dto.scheduledAt,
      type: dto.type,
    }, correlationId);

    return this.repo.findById(interview.id);
  }

  async complete(id: string, dto: CompleteInterviewDto, correlationId?: string) {
    const interview = await this.repo.findById(id);
    if (!interview) throw new ResourceNotFoundException('Interview', id);
    if (interview.status !== InterviewStatus.SCHEDULED) {
      throw new BusinessRuleViolationException('Only scheduled interviews can be completed');
    }

    await this.repo.update(id, {
      status: InterviewStatus.COMPLETED,
      feedback: dto.feedback,
      rating: dto.rating ?? null,
      completedAt: new Date(),
    });

    await this.publisher.publishInterviewCompleted({
      interviewId: id,
      applicationId: interview.applicationId,
      rating: dto.rating,
    }, correlationId);

    return this.repo.findById(id);
  }

  async cancel(id: string) {
    const interview = await this.repo.findById(id);
    if (!interview) throw new ResourceNotFoundException('Interview', id);
    await this.repo.update(id, { status: InterviewStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findByApplication(applicationId: string) {
    return this.repo.findByApplication(applicationId);
  }
}
