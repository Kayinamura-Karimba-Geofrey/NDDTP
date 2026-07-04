import { Injectable, Logger } from '@nestjs/common';
import { AssignmentRepository } from './repositories/assignment.repository';
import { VehicleRepository } from '../vehicles/repositories/vehicle.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/fleet.exceptions';
import { AssignVehicleDto, ReturnVehicleDto } from './dto/assignment.dto';
import { VehicleStatus, AssignmentStatus } from '../../common/enums';
import { CACHE_KEYS } from '../../common/constants';
import { RedisService } from '../cache/redis.module';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger(AssignmentService.name);

  constructor(
    private readonly repo: AssignmentRepository,
    private readonly vehicleRepo: VehicleRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async assign(assignedBy: string, dto: AssignVehicleDto) {
    const vehicle = await this.vehicleRepo.findById(dto.vehicleId);
    if (!vehicle) throw new ResourceNotFoundException('Vehicle', dto.vehicleId);
    if (vehicle.status !== VehicleStatus.AVAILABLE) {
      throw new BusinessRuleViolationException('Only available vehicles can be assigned');
    }

    const active = await this.repo.findActiveByVehicle(dto.vehicleId);
    if (active) throw new BusinessRuleViolationException('Vehicle already has an active assignment');

    const assignment = await this.repo.create({
      vehicleId: dto.vehicleId,
      driverId: dto.driverId,
      assignedBy,
      assignedAt: new Date(),
      notes: dto.notes ?? null,
      status: AssignmentStatus.ACTIVE,
    });

    await this.vehicleRepo.update(dto.vehicleId, { status: VehicleStatus.ASSIGNED });
    await this.redis.del(CACHE_KEYS.VEHICLE(dto.vehicleId));
    await this.publisher.publishVehicleAssigned({
      assignmentId: assignment.id, vehicleId: dto.vehicleId, driverId: dto.driverId, assignedBy,
    });

    this.logger.log(`Vehicle ${dto.vehicleId} assigned to ${dto.driverId}`);
    return assignment;
  }

  async return(vehicleId: string, returnedBy: string, dto: ReturnVehicleDto) {
    const assignment = await this.repo.findActiveByVehicle(vehicleId);
    if (!assignment) throw new ResourceNotFoundException('ActiveAssignment', vehicleId);

    await this.repo.update(assignment.id, { status: AssignmentStatus.RETURNED, returnedAt: new Date() });
    await this.vehicleRepo.update(vehicleId, { status: VehicleStatus.AVAILABLE });
    await this.redis.del(CACHE_KEYS.VEHICLE(vehicleId));
    await this.publisher.publishVehicleReturned({ vehicleId, driverId: assignment.driverId, returnedBy });
    return this.repo.findByVehicle(vehicleId);
  }

  findByVehicle(vehicleId: string) {
    return this.repo.findByVehicle(vehicleId);
  }

  findByDriver(driverId: string) {
    return this.repo.findByDriver(driverId);
  }
}
