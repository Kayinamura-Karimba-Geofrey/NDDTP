import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany,
} from 'typeorm';
import { FacilityType, FacilityStatus } from '../../common/enums';
import { MedicalAppointment } from './medical-appointment.entity';

@Entity('medical_facilities')
@Index('idx_medical_facilities_code', ['code'], { unique: true })
export class MedicalFacility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: FacilityType })
  type: FacilityType;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @Column({ type: 'int', default: 0 })
  capacity: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ type: 'enum', enum: FacilityStatus, default: FacilityStatus.ACTIVE })
  status: FacilityStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => MedicalAppointment, (a) => a.facility)
  appointments: MedicalAppointment[];
}
