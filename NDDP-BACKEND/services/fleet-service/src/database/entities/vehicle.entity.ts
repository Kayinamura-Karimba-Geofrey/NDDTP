import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { VehicleStatus, FuelType } from '../../common/enums';
import { VehicleType } from './vehicle-type.entity';

@Entity('vehicles')
@Index('idx_vehicles_number', ['vehicleNumber'], { unique: true })
@Index('idx_vehicles_registration', ['registrationNumber'], { unique: true })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vehicle_number', type: 'varchar', length: 50, unique: true })
  vehicleNumber: string;

  @Column({ name: 'registration_number', type: 'varchar', length: 30, unique: true })
  registrationNumber: string;

  @Column({ name: 'type_id', type: 'uuid' })
  typeId: string;

  @Column({ type: 'varchar', length: 200 })
  make: string;

  @Column({ type: 'varchar', length: 200 })
  model: string;

  @Column({ name: 'model_year', type: 'int', nullable: true })
  modelYear: number | null;

  @Column({ type: 'enum', enum: FuelType, default: FuelType.DIESEL })
  fuelType: FuelType;

  @Column({ type: 'enum', enum: VehicleStatus, default: VehicleStatus.REGISTERED })
  status: VehicleStatus;

  @Column({ name: 'current_odometer', type: 'int', default: 0 })
  currentOdometer: number;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => VehicleType)
  @JoinColumn({ name: 'type_id' })
  type: VehicleType;
}
