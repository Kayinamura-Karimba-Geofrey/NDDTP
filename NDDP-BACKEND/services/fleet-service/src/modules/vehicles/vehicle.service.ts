import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VehicleRepository } from './repositories/vehicle.repository';
import { VehicleTypeRepository } from '../types/repositories/vehicle-type.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, DuplicateResourceException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/fleet.exceptions';
import { CreateVehicleDto, UpdateVehicleStatusDto } from './dto/vehicle.dto';
import { VehicleStatus, FuelType } from '../../common/enums';
import { VEHICLE_STATUS_TRANSITIONS, CACHE_KEYS } from '../../common/constants';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    private readonly repo: VehicleRepository,
    private readonly typeRepo: VehicleTypeRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async register(dto: CreateVehicleDto) {
    const type = await this.typeRepo.findById(dto.typeId);
    if (!type) throw new ResourceNotFoundException('VehicleType', dto.typeId);

    const existing = await this.repo.findByRegistration(dto.registrationNumber);
    if (existing) throw new DuplicateResourceException('registrationNumber', dto.registrationNumber);

    const vehicleNumber = `VEH-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const vehicle = await this.repo.create({
      vehicleNumber,
      registrationNumber: dto.registrationNumber,
      typeId: dto.typeId,
      make: dto.make,
      model: dto.model,
      modelYear: dto.modelYear ?? null,
      fuelType: dto.fuelType ?? FuelType.DIESEL,
      status: VehicleStatus.REGISTERED,
      unitId: dto.unitId ?? null,
      notes: dto.notes ?? null,
      currentOdometer: 0,
    });

    await this.publisher.publishVehicleRegistered({ vehicleId: vehicle.id, vehicleNumber, typeId: dto.typeId });
    this.logger.log(`Vehicle registered: ${vehicleNumber}`);
    return this.repo.findById(vehicle.id);
  }

  async makeAvailable(id: string) {
    const vehicle = await this.findById(id);
    this.assertTransition(vehicle.status, VehicleStatus.AVAILABLE);
    await this.repo.update(id, { status: VehicleStatus.AVAILABLE });
    await this.redis.del(CACHE_KEYS.VEHICLE(id));
    return this.repo.findById(id);
  }

  async updateStatus(id: string, dto: UpdateVehicleStatusDto) {
    const vehicle = await this.findById(id);
    this.assertTransition(vehicle.status, dto.status);
    await this.repo.update(id, { status: dto.status });
    await this.redis.del(CACHE_KEYS.VEHICLE(id));
    return this.repo.findById(id);
  }

  async updateOdometer(id: string, odometer: number) {
    const vehicle = await this.findById(id);
    if (odometer < vehicle.currentOdometer) {
      throw new BusinessRuleViolationException('Odometer cannot decrease');
    }
    await this.repo.update(id, { currentOdometer: odometer });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: VehicleStatus; typeId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.typeId);
  }

  async findById(id: string) {
    const vehicle = await this.repo.findById(id);
    if (!vehicle) throw new ResourceNotFoundException('Vehicle', id);
    return vehicle;
  }

  private assertTransition(from: VehicleStatus, to: VehicleStatus) {
    const allowed = VEHICLE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
