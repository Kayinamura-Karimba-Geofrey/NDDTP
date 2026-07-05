import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CertificationRepository } from './repositories/certification.repository';
import { EnrollmentRepository } from '../enrollments/repositories/enrollment.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/training.exceptions';
import { IssueCertificationDto, RevokeCertificationDto } from './dto/certification.dto';
import { CertificationStatus, EnrollmentStatus } from '../../common/enums';

@Injectable()
export class CertificationService {
  private readonly logger = new Logger(CertificationService.name);

  constructor(
    private readonly repo: CertificationRepository,
    private readonly enrollmentRepo: EnrollmentRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async issue(issuedBy: string, dto: IssueCertificationDto) {
    const enrollment = await this.enrollmentRepo.findById(dto.enrollmentId);
    if (!enrollment) throw new ResourceNotFoundException('TrainingEnrollment', dto.enrollmentId);
    if (enrollment.status !== EnrollmentStatus.COMPLETED) {
      throw new BusinessRuleViolationException('Certification can only be issued for completed enrollments');
    }

    const certificateNumber = `TCERT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const cert = await this.repo.create({
      certificateNumber,
      userId: enrollment.userId,
      enrollmentId: dto.enrollmentId,
      courseId: enrollment.session.courseId,
      score: enrollment.score,
      validUntil: dto.validUntil ?? null,
      status: CertificationStatus.ISSUED,
      issuedBy,
      issuedAt: new Date(),
    });

    await this.publisher.publishCertificationIssued({
      certificationId: cert.id, certificateNumber, userId: enrollment.userId,
      courseId: enrollment.session.courseId, issuedBy,
    });

    this.logger.log(`Certification ${certificateNumber} issued`);
    return cert;
  }

  async revoke(id: string, dto: RevokeCertificationDto) {
    const cert = await this.findById(id);
    if (cert.status !== CertificationStatus.ISSUED) {
      throw new BusinessRuleViolationException('Only issued certifications can be revoked');
    }

    await this.repo.update(id, { status: CertificationStatus.REVOKED, revokedReason: dto.reason });
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const cert = await this.repo.findById(id);
    if (!cert) throw new ResourceNotFoundException('TrainingCertification', id);
    return cert;
  }

  findAll(filter: { page?: number; limit?: number; userId?: string; status?: CertificationStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.userId, filter.status);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, userId);
  }
}
