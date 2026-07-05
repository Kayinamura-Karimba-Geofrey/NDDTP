import { Injectable, Logger } from '@nestjs/common';
import { InspectionRepository } from './repositories/inspection.repository';
import { VehicleRepository } from '../vehicles/repositories/vehicle.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/fleet.exceptions';
import { ScheduleInspectionDto, CompleteInspectionDto } from './dto/inspection.dto';
import { InspectionStatus, InspectionResult, VehicleStatus } from '../../common/enums';

@Injectable()
export class InspectionService {
  private readonly logger = new Logger(InspectionService.name);

  constructor(
    private readonly repo: InspectionRepository,
    private readonly vehicleRepo: VehicleRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async schedule(inspectorId: string, dto: ScheduleInspectionDto) {
    const vehicle = await this.vehicleRepo.findById(dto.vehicleId);
    if (!vehicle) throw new ResourceNotFoundException('Vehicle', dto.vehicleId);

    const inspection = await this.repo.create({
      vehicleId: dto.vehicleId,
      inspectorId,
      scheduledDate: new Date(dto.scheduledDate),
      status: InspectionStatus.SCHEDULED,
    });

    this.logger.log(`Inspection scheduled for vehicle ${dto.vehicleId}`);
    return this.repo.findById(inspection.id);
  }

  async complete(id: string, inspectorId: string, dto: CompleteInspectionDto) {
    const inspection = await this.findById(id);
    if (inspection.status !== InspectionStatus.SCHEDULED) {
      throw new BusinessRuleViolationException('Only scheduled inspections can be completed');
    }

    await this.repo.update(id, {
      status: InspectionStatus.COMPLETED,
      result: dto.result,
      findings: dto.findings ?? null,
      recommendations: dto.recommendations ?? null,
      completedAt: new Date(),
      inspectorId,
    });

    await this.publisher.publishInspectionCompleted({
      inspectionId: id, vehicleId: inspection.vehicleId, result: dto.result,
    });

    if (dto.result === InspectionResult.FAIL) {
      await this.vehicleRepo.update(inspection.vehicleId, { status: VehicleStatus.OUT_OF_SERVICE });
    }

    return this.repo.findById(id);
  }

  async cancel(id: string) {
    const inspection = await this.findById(id);
    if (inspection.status !== InspectionStatus.SCHEDULED) {
      throw new BusinessRuleViolationException('Only scheduled inspections can be cancelled');
    }
    await this.repo.update(id, { status: InspectionStatus.CANCELLED });
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const inspection = await this.repo.findById(id);
    if (!inspection) throw new ResourceNotFoundException('VehicleInspection', id);
    return inspection;
  }

  findByVehicle(vehicleId: string) {
    return this.repo.findByVehicle(vehicleId);
  }

  async findScheduled(page = 1, limit = 20) {
    const [data, total] = await this.repo.findScheduled(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}
