import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn,
} from 'typeorm';
import { AssignmentType } from '../../common/enums';
import { PersonnelRecord } from './personnel-record.entity';
import { Unit } from './unit.entity';

@Entity('assignments')
@Index('idx_assignments_personnel', ['personnelRecordId'])
@Index('idx_assignments_unit', ['unitId'])
@Index('idx_assignments_current', ['isCurrent'])
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'personnel_record_id', type: 'uuid' })
  personnelRecordId: string;

  @Column({ name: 'unit_id', type: 'uuid' })
  unitId: string;

  @Column({ name: 'position_title', type: 'varchar', length: 200 })
  positionTitle: string;

  @Column({ name: 'assignment_type', type: 'enum', enum: AssignmentType, default: AssignmentType.PERMANENT })
  assignmentType: AssignmentType;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string | null;

  @Column({ name: 'is_current', type: 'boolean', default: true })
  isCurrent: boolean;

  @Column({ name: 'order_number', type: 'varchar', length: 100, nullable: true })
  orderNumber: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => PersonnelRecord, (pr) => pr.assignments)
  @JoinColumn({ name: 'personnel_record_id' })
  personnelRecord: PersonnelRecord;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;
}
