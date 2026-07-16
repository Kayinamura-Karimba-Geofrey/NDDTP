import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { SecurityEventRepository } from './repositories/security-event.repository';
import { RetentionPolicyRepository } from './repositories/retention-policy.repository';
import { EventPublisherService } from '../../events/event-publisher.service';

@Injectable()
export class RetentionService {
  private readonly logger = new Logger(RetentionService.name);

  constructor(
    private readonly cs: ConfigService,
    private readonly auditRepo: AuditLogRepository,
    private readonly securityRepo: SecurityEventRepository,
    private readonly policyRepo: RetentionPolicyRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async applyRetention(): Promise<void> {
    const policies = await this.policyRepo.findAllActive();
    const defaultDays = this.cs.get<number>('audit.retentionDays') || 2555;
    let totalDeleted = 0;

    for (const policy of policies) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - policy.retentionDays);
      const deleted = await this.auditRepo.deleteOlderThan(cutoff, policy.category);
      totalDeleted += deleted;
      if (deleted > 0) this.logger.log(`Purged ${deleted} audit logs for category ${policy.category}`);
    }

    const securityCutoff = new Date();
    securityCutoff.setDate(securityCutoff.getDate() - defaultDays);
    const securityDeleted = await this.securityRepo.deleteOlderThan(securityCutoff);
    totalDeleted += securityDeleted;

    if (totalDeleted > 0) {
      await this.publisher.publishRetentionApplied({ deletedCount: totalDeleted });
      this.logger.log(`Retention applied: ${totalDeleted} records purged`);
    }
  }
}
