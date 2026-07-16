import { Injectable } from '@nestjs/common';
import { AssignmentRepository } from './repositories/assignment.repository';
import { PersonnelRecordRepository } from '../personnel/repositories/personnel-record.repository';
import { UnitRepository } from '../units/repositories/unit.repository';
import { ServiceHistoryRepository } from '../personnel/repositories/service-history.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException } from '../../common/exceptions/personnel.exceptions';
import { CreateAssignmentDto, EndAssignmentDto } from './dto/assignment.dto';
import { ServiceEventType } from '../../common/enums';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly repo: AssignmentRepository,
    private readonly personnelRepo: PersonnelRecordRepository,
    private readonly unitRepo: UnitRepository,
    private readonly historyRepo: ServiceHistoryRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(personnelId: string, dto: CreateAssignmentDto, correlationId?: string) {
    const personnel = await this.personnelRepo.findById(personnelId);
    if (!personnel) throw new ResourceNotFoundException('PersonnelRecord', personnelId);
    const unit = await this.unitRepo.findById(dto.unitId);
    if (!unit) throw new ResourceNotFoundException('Unit', dto.unitId);

    await this.repo.endCurrent(personnelId, dto.startDate);
    const assignment = await this.repo.create({
      personnelRecordId: personnelId,
      unitId: dto.unitId,
      positionTitle: dto.positionTitle,
      assignmentType: dto.assignmentType,
      startDate: dto.startDate,
      orderNumber: dto.orderNumber ?? null,
      notes: dto.notes ?? null,
      isCurrent: true,
    });

    await this.historyRepo.create({
      personnelRecordId: personnelId,
      eventType: ServiceEventType.TRANSFER,
      title: `Assigned to ${unit.name} as ${dto.positionTitle}`,
      eventDate: dto.startDate,
      referenceNumber: dto.orderNumber ?? null,
    });

    await this.publisher.publishAssignmentCreated({
      personnelId, userId: personnel.userId, unitId: unit.id, unitName: unit.name, positionTitle: dto.positionTitle,
    }, correlationId);

    return this.repo.findById(assignment.id);
  }

  async end(id: string, dto: EndAssignmentDto, correlationId?: string) {
    const assignment = await this.repo.findById(id);
    if (!assignment) throw new ResourceNotFoundException('Assignment', id);

    await this.repo.update(id, { isCurrent: false, endDate: dto.endDate, notes: dto.notes ?? assignment.notes });
    const personnel = await this.personnelRepo.findById(assignment.personnelRecordId);

    await this.publisher.publishAssignmentEnded({
      assignmentId: id, personnelId: assignment.personnelRecordId,
      userId: personnel?.userId, endDate: dto.endDate,
    }, correlationId);

    return this.repo.findById(id);
  }

  getByPersonnel(personnelId: string) {
    return this.repo.findByPersonnel(personnelId);
  }
}
