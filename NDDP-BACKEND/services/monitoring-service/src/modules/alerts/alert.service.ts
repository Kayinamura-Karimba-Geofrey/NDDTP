import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlertRepository } from './repositories/alert.repository';
import { CheckRepository } from '../checks/repositories/check.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RaiseAlertDto } from './dto/alert.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/monitoring.exceptions';
import { CheckStatus, AlertSeverity, AlertStatus } from '../../common/enums';
import { ALERT_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);

  constructor(
    private readonly repo: AlertRepository,
    private readonly checkRepo: CheckRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async raise(dto: RaiseAlertDto) {
    const check = await this.checkRepo.findById(dto.checkId);
    if (!check) throw new ResourceNotFoundException('MonitoringCheck', dto.checkId);
    if (check.status !== CheckStatus.FAILED) {
      throw new BusinessRuleViolationException('Alerts can only be raised from failed health checks');
    }

    const alertNumber = `ALT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const alert = await this.repo.create({
      alertNumber,
      checkId: dto.checkId,
      severity: dto.severity ?? AlertSeverity.WARNING,
      message: dto.message,
      status: AlertStatus.OPEN,
    });

    await this.publisher.publishAlertRaised({
      alertId: alert.id, alertNumber, checkId: dto.checkId, severity: alert.severity,
    });
    this.logger.log(`Alert raised: ${alertNumber}`);
    return this.repo.findById(alert.id);
  }

  async acknowledge(id: string, userId: string) {
    const alert = await this.findById(id);
    this.assertTransition(alert.status, AlertStatus.ACKNOWLEDGED);
    await this.repo.update(id, {
      status: AlertStatus.ACKNOWLEDGED,
      acknowledgedBy: userId,
      acknowledgedAt: new Date(),
    });
    await this.publisher.publishAlertAcknowledged({ alertId: id, alertNumber: alert.alertNumber, acknowledgedBy: userId });
    return this.repo.findById(id);
  }

  async resolve(id: string, userId: string) {
    const alert = await this.findById(id);
    this.assertTransition(alert.status, AlertStatus.RESOLVED);
    await this.repo.update(id, {
      status: AlertStatus.RESOLVED,
      resolvedBy: userId,
      resolvedAt: new Date(),
    });
    await this.publisher.publishAlertResolved({ alertId: id, alertNumber: alert.alertNumber, resolvedBy: userId });
    return this.repo.findById(id);
  }

  async close(id: string) {
    const alert = await this.findById(id);
    this.assertTransition(alert.status, AlertStatus.CLOSED);
    await this.repo.update(id, { status: AlertStatus.CLOSED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: AlertStatus; severity?: AlertSeverity }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.severity);
  }

  async findById(id: string) {
    const alert = await this.repo.findById(id);
    if (!alert) throw new ResourceNotFoundException('MonitoringAlert', id);
    return alert;
  }

  private assertTransition(from: AlertStatus, to: AlertStatus) {
    const allowed = ALERT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
