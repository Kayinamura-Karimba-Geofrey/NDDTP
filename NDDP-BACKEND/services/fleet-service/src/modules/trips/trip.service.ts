import { Injectable, Logger } from '@nestjs/common';
import { TripRepository } from './repositories/trip.repository';
import { VehicleRepository } from '../vehicles/repositories/vehicle.repository';
import { VehicleService } from '../vehicles/vehicle.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/fleet.exceptions';
import { LogTripDto } from './dto/trip.dto';

@Injectable()
export class TripService {
  private readonly logger = new Logger(TripService.name);

  constructor(
    private readonly repo: TripRepository,
    private readonly vehicleRepo: VehicleRepository,
    private readonly vehicleService: VehicleService,
    private readonly publisher: EventPublisherService,
  ) {}

  async log(loggedBy: string, dto: LogTripDto) {
    const vehicle = await this.vehicleRepo.findById(dto.vehicleId);
    if (!vehicle) throw new ResourceNotFoundException('Vehicle', dto.vehicleId);

    if (dto.endOdometer < dto.startOdometer) {
      throw new BusinessRuleViolationException('End odometer must be >= start odometer');
    }
    if (dto.startOdometer < vehicle.currentOdometer) {
      throw new BusinessRuleViolationException(`Start odometer must be >= current (${vehicle.currentOdometer})`);
    }

    const distanceKm = dto.endOdometer - dto.startOdometer;
    const trip = await this.repo.create({
      vehicleId: dto.vehicleId,
      driverId: dto.driverId,
      purpose: dto.purpose,
      origin: dto.origin,
      destination: dto.destination,
      startOdometer: dto.startOdometer,
      endOdometer: dto.endOdometer,
      distanceKm,
      fuelUsedLiters: dto.fuelUsedLiters ?? null,
      notes: dto.notes ?? null,
      loggedBy,
    });

    await this.vehicleService.updateOdometer(dto.vehicleId, dto.endOdometer);
    await this.publisher.publishTripLogged({
      tripId: trip.id, vehicleId: dto.vehicleId, driverId: dto.driverId, distanceKm,
    });

    this.logger.log(`Trip logged for vehicle ${dto.vehicleId}: ${distanceKm}km`);
    return trip;
  }

  findByVehicle(vehicleId: string) {
    return this.repo.findByVehicle(vehicleId);
  }

  findByDriver(driverId: string) {
    return this.repo.findByDriver(driverId);
  }
}
