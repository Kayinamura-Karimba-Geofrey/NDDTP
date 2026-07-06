import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, Index, OneToMany,
} from 'typeorm';
import { PersonnelType, ServiceStatus, ServiceBranch } from '../../common/enums';
import { RankHistory } from './rank-history.entity';
import { Assignment } from './assignment.entity';
import { PersonnelQualification } from './personnel-qualification.entity';
import { ServiceHistory } from './service-history.entity';

@Entity('personnel_records')
@Index('idx_personnel_user_id', ['userId'], { unique: true })
@Index('idx_personnel_service_number', ['serviceNumber'], { unique: true })
@Index('idx_personnel_status', ['serviceStatus'])
export class PersonnelRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  userId: string;

  @Column({ name: 'service_number', type: 'varchar', length: 50, unique: true })
  serviceNumber: string;

  @Column({ name: 'employee_number', type: 'varchar', length: 50, nullable: true })
  employeeNumber: string | null;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ name: 'personnel_type', type: 'enum', enum: PersonnelType, default: PersonnelType.ENLISTED })
  personnelType: PersonnelType;

  @Column({ name: 'service_status', type: 'enum', enum: ServiceStatus, default: ServiceStatus.ACTIVE })
  serviceStatus: ServiceStatus;

  @Column({ type: 'enum', enum: ServiceBranch, default: ServiceBranch.ARMY })
  branch: ServiceBranch;

  @Column({ name: 'blood_group', type: 'varchar', length: 10, nullable: true })
  bloodGroup: string | null;

  @Column({ name: 'marital_status', type: 'varchar', length: 30, nullable: true })
  maritalStatus: string | null;

  @Column({ name: 'national_id', type: 'varchar', length: 50, nullable: true })
  nationalId: string | null;

  @Column({ name: 'enlistment_date', type: 'date', nullable: true })
  enlistmentDate: string | null;

  @Column({ name: 'separation_date', type: 'date', nullable: true })
  separationDate: string | null;

  @Column({ name: 'years_of_service', type: 'decimal', precision: 5, scale: 2, nullable: true })
  yearsOfService: number | null;

  @Column({ name: 'security_clearance', type: 'varchar', length: 50, nullable: true })
  securityClearance: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => RankHistory, (rh) => rh.personnelRecord)
  rankHistory: RankHistory[];

  @OneToMany(() => Assignment, (a) => a.personnelRecord)
  assignments: Assignment[];

  @OneToMany(() => PersonnelQualification, (pq) => pq.personnelRecord)
  qualifications: PersonnelQualification[];

  @OneToMany(() => ServiceHistory, (sh) => sh.personnelRecord)
  serviceHistory: ServiceHistory[];
}
