import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TransportMode, RouteStatus } from '../../common/enums';
import { LogisticsLocation } from './logistics-location.entity';

@Entity('transport_routes')
@Index('idx_transport_routes_code', ['code'], { unique: true })
export class TransportRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'origin_location_id', type: 'uuid' })
  originLocationId: string;

  @Column({ name: 'destination_location_id', type: 'uuid' })
  destinationLocationId: string;

  @Column({ type: 'enum', enum: TransportMode })
  transportMode: TransportMode;

  @Column({ name: 'distance_km', type: 'decimal', precision: 8, scale: 2, nullable: true })
  distanceKm: number | null;

  @Column({ name: 'estimated_hours', type: 'decimal', precision: 6, scale: 2, nullable: true })
  estimatedHours: number | null;

  @Column({ type: 'enum', enum: RouteStatus, default: RouteStatus.ACTIVE })
  status: RouteStatus;

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
}
