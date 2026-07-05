import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TransportMode, ShipmentStatus, ShipmentPriority } from '../../common/enums';
import { LogisticsLocation } from './logistics-location.entity';
import { TransportRoute } from './transport-route.entity';
import { ShipmentItem } from './shipment-item.entity';

@Entity('shipments')
@Index('idx_shipments_number', ['shipmentNumber'], { unique: true })
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'shipment_number', type: 'varchar', length: 50, unique: true })
  shipmentNumber: string;

  @Column({ name: 'origin_location_id', type: 'uuid' })
  originLocationId: string;

  @Column({ name: 'destination_location_id', type: 'uuid' })
  destinationLocationId: string;

  @Column({ name: 'route_id', type: 'uuid', nullable: true })
  routeId: string | null;

  @Column({ type: 'enum', enum: TransportMode })
  transportMode: TransportMode;

  @Column({ type: 'enum', enum: ShipmentPriority, default: ShipmentPriority.ROUTINE })
  priority: ShipmentPriority;

  @Column({ type: 'enum', enum: ShipmentStatus, default: ShipmentStatus.DRAFT })
  status: ShipmentStatus;

  @Column({ name: 'scheduled_date', type: 'timestamptz', nullable: true })
  scheduledDate: Date | null;

  @Column({ name: 'dispatched_at', type: 'timestamptz', nullable: true })
  dispatchedAt: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt: Date | null;

  @Column({ name: 'driver_id', type: 'uuid', nullable: true })
  driverId: string | null;

  @Column({ name: 'vehicle_id', type: 'uuid', nullable: true })
  vehicleId: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => LogisticsLocation)
  @JoinColumn({ name: 'origin_location_id' })
  originLocation: LogisticsLocation;

  @ManyToOne(() => LogisticsLocation)
  @JoinColumn({ name: 'destination_location_id' })
  destinationLocation: LogisticsLocation;

  @ManyToOne(() => TransportRoute, { nullable: true })
  @JoinColumn({ name: 'route_id' })
  route: TransportRoute | null;

  @OneToMany(() => ShipmentItem, (i) => i.shipment)
  items: ShipmentItem[];
}
