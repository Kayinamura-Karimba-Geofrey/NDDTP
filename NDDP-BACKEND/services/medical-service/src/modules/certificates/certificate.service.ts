import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CertificateRepository } from './repositories/certificate.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/medical.exceptions';
import { CreateCertificateDto, IssueCertificateDto, RevokeCertificateDto } from './dto/certificate.dto';
import { CertificateStatus, CertificateType } from '../../common/enums';

@Injectable()
export class CertificateService {
  private readonly logger = new Logger(CertificateService.name);

  constructor(
    private readonly repo: CertificateRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateCertificateDto) {
    const certificateNumber = `MCERT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    return this.repo.create({
      certificateNumber,
      userId: dto.userId,
      type: dto.type,
      description: dto.description,
      validFrom: dto.validFrom ?? null,
      validUntil: dto.validUntil ?? null,
      status: CertificateStatus.DRAFT,
    });
  }

  async issue(id: string, issuedBy: string, dto: IssueCertificateDto) {
    const cert = await this.findById(id);
    if (cert.status !== CertificateStatus.DRAFT) {
      throw new BusinessRuleViolationException('Only draft certificates can be issued');
    }

    await this.repo.update(id, {
      status: CertificateStatus.ISSUED,
      issuedBy,
      issuedAt: new Date(),
      validFrom: dto.validFrom ?? cert.validFrom,
      validUntil: dto.validUntil ?? cert.validUntil,
    });

    await this.publisher.publishCertificateIssued({
      certificateId: id, certificateNumber: cert.certificateNumber, userId: cert.userId,
      type: cert.type, issuedBy,
    });

    this.logger.log(`Certificate ${cert.certificateNumber} issued`);
    return this.repo.findById(id);
  }

  async revoke(id: string, dto: RevokeCertificateDto) {
    const cert = await this.findById(id);
    if (cert.status !== CertificateStatus.ISSUED) {
      throw new BusinessRuleViolationException('Only issued certificates can be revoked');
    }

    await this.repo.update(id, { status: CertificateStatus.REVOKED, revokedReason: dto.reason });
    await this.publisher.publishCertificateRevoked({
      certificateId: id, certificateNumber: cert.certificateNumber, userId: cert.userId, reason: dto.reason,
    });

    return this.repo.findById(id);
  }

  async findById(id: string) {
    const cert = await this.repo.findById(id);
    if (!cert) throw new ResourceNotFoundException('MedicalCertificate', id);
    return cert;
  }

  findAll(filter: { page?: number; limit?: number; userId?: string; type?: CertificateType; status?: CertificateStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.userId, filter.type, filter.status);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, userId);
  }
}
