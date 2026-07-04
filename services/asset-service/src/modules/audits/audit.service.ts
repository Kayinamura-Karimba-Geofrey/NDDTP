import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AuditRepository } from './repositories/audit.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/asset.exceptions';
import { CreateAuditDto, CompleteAuditDto } from './dto/audit.dto';
import { AuditStatus } from '../../common/enums';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    private readonly repo: AuditRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async schedule(conductedBy: string, dto: CreateAuditDto) {
    const auditNumber = `AUD-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const audit = await this.repo.create({
      auditNumber,
      unitId: dto.unitId,
      conductedBy,
      auditDate: dto.auditDate,
      status: AuditStatus.SCHEDULED,
    });
    this.logger.log(`Audit scheduled: ${auditNumber}`);
    return audit;
  }

  async start(id: string) {
    const audit = await this.findById(id);
    if (audit.status !== AuditStatus.SCHEDULED) {
      throw new BusinessRuleViolationException('Only scheduled audits can be started');
    }
    await this.repo.update(id, { status: AuditStatus.IN_PROGRESS });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteAuditDto) {
    const audit = await this.findById(id);
    if (audit.status !== AuditStatus.IN_PROGRESS) {
      throw new BusinessRuleViolationException('Only in-progress audits can be completed');
    }

    await this.repo.update(id, {
      status: AuditStatus.COMPLETED,
      findings: dto.findings ?? null,
      summary: dto.summary ?? null,
      completedAt: new Date(),
    });

    await this.publisher.publishAuditCompleted({
      auditId: id, auditNumber: audit.auditNumber, unitId: audit.unitId,
    });

    return this.repo.findById(id);
  }

  async findById(id: string) {
    const audit = await this.repo.findById(id);
    if (!audit) throw new ResourceNotFoundException('AssetAudit', id);
    return audit;
  }

  findAll(filter: { page?: number; limit?: number; unitId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.unitId);
  }
}
