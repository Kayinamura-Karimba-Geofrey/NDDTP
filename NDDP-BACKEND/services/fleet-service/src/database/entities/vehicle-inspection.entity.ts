import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionStatus, InspectionResult } from '../../common/enums';
import { Vehicle } from './vehicle.entity';

@Entity('vehicle_inspections')
@Index('idx_inspections_vehicle', ['vehicleId'])
export class VehicleInspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vehicle_id', type: 'uuid' })
  vehicleId: string;

  @Column({ name: 'inspector_id', type: 'uuid' })
  inspectorId: string;

  @Column({ type: 'enum', enum: InspectionStatus, default: InspectionStatus.SCHEDULED })
  status: InspectionStatus;

  @Column({ type: 'enum', enum: InspectionResult, nullable: true })
  result: InspectionResult | null;

  @Column({ name: 'scheduled_date', type: 'timestamptz' })
  scheduledDate: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @Column({ type: 'text', nullable: true })
  findings: string | null;

  @Column({ type: 'text', nullable: true })
  recommendations: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
