import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ShipmentRepository } from './repositories/shipment.repository';
import { LocationRepository } from '../locations/repositories/location.repository';
import { RouteRepository } from '../routes/repositories/route.repository';
import { TrackingRepository } from '../tracking/repositories/tracking.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/logistics.exceptions';
import { CreateShipmentDto, ScheduleShipmentDto } from './dto/shipment.dto';
import { ShipmentStatus, ShipmentPriority, TrackingEventType } from '../../common/enums';
import { SHIPMENT_STATUS_TRANSITIONS, CACHE_KEYS } from '../../common/constants';

@Injectable()
export class ShipmentService {
  private readonly logger = new Logger(ShipmentService.name);

  constructor(
    private readonly repo: ShipmentRepository,
    private readonly locationRepo: LocationRepository,
    private readonly routeRepo: RouteRepository,
    private readonly trackingRepo: TrackingRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateShipmentDto) {
    if (dto.originLocationId === dto.destinationLocationId) {
      throw new BusinessRuleViolationException('Origin and destination must be different');
    }
    if (!dto.items?.length) throw new BusinessRuleViolationException('Shipment must have at least one item');

    const origin = await this.locationRepo.findById(dto.originLocationId);
    if (!origin) throw new ResourceNotFoundException('LogisticsLocation', dto.originLocationId);
    const dest = await this.locationRepo.findById(dto.destinationLocationId);
    if (!dest) throw new ResourceNotFoundException('LogisticsLocation', dto.destinationLocationId);
    if (dto.routeId) {
      const route = await this.routeRepo.findById(dto.routeId);
      if (!route) throw new ResourceNotFoundException('TransportRoute', dto.routeId);
    }

    const shipmentNumber = `SHP-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const shipment = await this.repo.createWithItems(
      {
        shipmentNumber,
        originLocationId: dto.originLocationId,
        destinationLocationId: dto.destinationLocationId,
        routeId: dto.routeId ?? null,
        transportMode: dto.transportMode,
        priority: dto.priority ?? ShipmentPriority.ROUTINE,
        status: ShipmentStatus.DRAFT,
        createdBy,
        notes: dto.notes ?? null,
      },
      dto.items.map((i) => ({
        inventoryItemId: i.inventoryItemId ?? null,
        description: i.description,
        quantity: i.quantity,
        unit: i.unit ?? 'EACH',
        weightKg: i.weightKg ?? null,
      })),
    );

    await this.trackingRepo.create({
      shipmentId: shipment!.id,
      eventType: TrackingEventType.CREATED,
      notes: 'Shipment created',
      recordedBy: createdBy,
    });

    await this.publisher.publishShipmentCreated({
      shipmentId: shipment!.id, shipmentNumber, originLocationId: dto.originLocationId, destinationLocationId: dto.destinationLocationId,
    });
    this.logger.log(`Shipment created: ${shipmentNumber}`);
    return shipment;
  }

  async schedule(id: string, userId: string, dto: ScheduleShipmentDto) {
    const shipment = await this.findById(id);
    this.assertTransition(shipment.status, ShipmentStatus.SCHEDULED);

    await this.repo.update(id, {
      status: ShipmentStatus.SCHEDULED,
      scheduledDate: new Date(dto.scheduledDate),
      driverId: dto.driverId ?? null,
      vehicleId: dto.vehicleId ?? null,
    });

    await this.trackingRepo.create({
      shipmentId: id, eventType: TrackingEventType.SCHEDULED, notes: `Scheduled for ${dto.scheduledDate}`, recordedBy: userId,
    });

    await this.redis.del(CACHE_KEYS.SHIPMENT(id));
    await this.publisher.publishShipmentScheduled({ shipmentId: id, shipmentNumber: shipment.shipmentNumber, scheduledDate: dto.scheduledDate });
    return this.repo.findById(id);
  }

  async dispatch(id: string, userId: string) {
    const shipment = await this.findById(id);
    this.assertTransition(shipment.status, ShipmentStatus.DISPATCHED);

    await this.repo.update(id, { status: ShipmentStatus.DISPATCHED, dispatchedAt: new Date() });
    await this.trackingRepo.create({
      shipmentId: id, eventType: TrackingEventType.DISPATCHED, notes: 'Shipment dispatched', recordedBy: userId,
    });

    await this.redis.del(CACHE_KEYS.SHIPMENT(id));
    await this.publisher.publishShipmentDispatched({ shipmentId: id, shipmentNumber: shipment.shipmentNumber });
    return this.repo.findById(id);
  }

  async markInTransit(id: string, userId: string, location?: string) {
    const shipment = await this.findById(id);
    this.assertTransition(shipment.status, ShipmentStatus.IN_TRANSIT);

    await this.repo.update(id, { status: ShipmentStatus.IN_TRANSIT });
    await this.trackingRepo.create({
      shipmentId: id, eventType: TrackingEventType.IN_TRANSIT, location: location ?? null, notes: 'In transit', recordedBy: userId,
    });

    await this.redis.del(CACHE_KEYS.SHIPMENT(id));
    await this.publisher.publishTrackingUpdated({ shipmentId: id, status: ShipmentStatus.IN_TRANSIT });
    return this.repo.findById(id);
  }

  async deliver(id: string, userId: string) {
    const shipment = await this.findById(id);
    this.assertTransition(shipment.status, ShipmentStatus.DELIVERED);

    await this.repo.update(id, { status: ShipmentStatus.DELIVERED, deliveredAt: new Date() });
    await this.trackingRepo.create({
      shipmentId: id, eventType: TrackingEventType.DELIVERED, notes: 'Delivered', recordedBy: userId,
    });

    await this.redis.del(CACHE_KEYS.SHIPMENT(id));
    await this.publisher.publishShipmentDelivered({ shipmentId: id, shipmentNumber: shipment.shipmentNumber });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, reason?: string) {
    const shipment = await this.findById(id);
    this.assertTransition(shipment.status, ShipmentStatus.CANCELLED);

    await this.repo.update(id, { status: ShipmentStatus.CANCELLED });
    await this.trackingRepo.create({
      shipmentId: id, eventType: TrackingEventType.CANCELLED, notes: reason ?? 'Cancelled', recordedBy: userId,
    });

    await this.redis.del(CACHE_KEYS.SHIPMENT(id));
    await this.publisher.publishShipmentCancelled({ shipmentId: id, shipmentNumber: shipment.shipmentNumber, reason });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: ShipmentStatus; originLocationId?: string; destinationLocationId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.originLocationId, filter.destinationLocationId);
  }

  async findById(id: string) {
    const shipment = await this.repo.findById(id);
    if (!shipment) throw new ResourceNotFoundException('Shipment', id);
    return shipment;
  }

  private assertTransition(from: ShipmentStatus, to: ShipmentStatus) {
    const allowed = SHIPMENT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
