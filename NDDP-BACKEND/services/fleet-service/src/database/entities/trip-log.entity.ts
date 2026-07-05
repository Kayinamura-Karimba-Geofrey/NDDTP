import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TripPurpose } from '../../common/enums';
import { Vehicle } from './vehicle.entity';

@Entity('trip_logs')
@Index('idx_trip_logs_vehicle', ['vehicleId'])
export class TripLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vehicle_id', type: 'uuid' })
  vehicleId: string;

  @Column({ name: 'driver_id', type: 'uuid' })
  driverId: string;

  @Column({ type: 'enum', enum: TripPurpose })
  purpose: TripPurpose;

  @Column({ type: 'varchar', length: 300 })
  origin: string;

  @Column({ type: 'varchar', length: 300 })
  destination: string;

  @Column({ name: 'start_odometer', type: 'int' })
  startOdometer: number;

  @Column({ name: 'end_odometer', type: 'int' })
  endOdometer: number;

  @Column({ name: 'distance_km', type: 'int' })
  distanceKm: number;

  @Column({ name: 'fuel_used_liters', type: 'decimal', precision: 8, scale: 2, nullable: true })
  fuelUsedLiters: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'logged_by', type: 'uuid' })
  loggedBy: string;

  @CreateDateColumn({ name: 'logged_at', type: 'timestamptz' })
  loggedAt: Date;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
