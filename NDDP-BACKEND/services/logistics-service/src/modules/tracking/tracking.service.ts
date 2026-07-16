import { Injectable } from '@nestjs/common';
import { TrackingRepository } from './repositories/tracking.repository';
import { ShipmentRepository } from '../shipments/repositories/shipment.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, InvalidStatusTransitionException } from '../../common/exceptions/logistics.exceptions';
import { RecordTrackingDto, DelayShipmentDto } from './dto/tracking.dto';
import { ShipmentStatus, TrackingEventType } from '../../common/enums';
import { SHIPMENT_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class TrackingService {
  constructor(
    private readonly repo: TrackingRepository,
    private readonly shipmentRepo: ShipmentRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async record(shipmentId: string, recordedBy: string, dto: RecordTrackingDto) {
    await this.ensureShipment(shipmentId);
    const event = await this.repo.create({
      shipmentId,
      eventType: dto.eventType,
      location: dto.location ?? null,
      notes: dto.notes ?? null,
      recordedBy,
    });
    await this.publisher.publishTrackingUpdated({ shipmentId, eventType: dto.eventType });
    return event;
  }

  async markDelayed(shipmentId: string, recordedBy: string, dto: DelayShipmentDto) {
    const shipment = await this.shipmentRepo.findById(shipmentId);
    if (!shipment) throw new ResourceNotFoundException('Shipment', shipmentId);
    this.assertTransition(shipment.status, ShipmentStatus.DELAYED);

    await this.shipmentRepo.update(shipmentId, { status: ShipmentStatus.DELAYED });
    const event = await this.repo.create({
      shipmentId,
      eventType: TrackingEventType.DELAYED,
      location: dto.location ?? null,
      notes: dto.reason,
      recordedBy,
    });
    await this.publisher.publishTrackingUpdated({ shipmentId, status: ShipmentStatus.DELAYED, reason: dto.reason });
    return event;
  }

  async getHistory(shipmentId: string) {
    await this.ensureShipment(shipmentId);
    return this.repo.findByShipment(shipmentId);
  }

  private async ensureShipment(id: string) {
    const shipment = await this.shipmentRepo.findById(id);
    if (!shipment) throw new ResourceNotFoundException('Shipment', id);
    return shipment;
  }

  private assertTransition(from: ShipmentStatus, to: ShipmentStatus) {
    const allowed = SHIPMENT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}
