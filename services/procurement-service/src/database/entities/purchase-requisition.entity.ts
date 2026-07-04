import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { RequisitionStatus, ProcurementPriority } from '../../common/enums';
import { RequisitionItem } from './requisition-item.entity';

@Entity('purchase_requisitions')
@Index('idx_requisitions_number', ['requisitionNumber'], { unique: true })
export class PurchaseRequisition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'requisition_number', type: 'varchar', length: 50, unique: true })
  requisitionNumber: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  departmentId: string | null;

  @Column({ type: 'enum', enum: RequisitionStatus, default: RequisitionStatus.DRAFT })
  status: RequisitionStatus;

  @Column({ type: 'enum', enum: ProcurementPriority, default: ProcurementPriority.ROUTINE })
  priority: ProcurementPriority;

  @Column({ type: 'text', nullable: true })
  justification: string | null;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => RequisitionItem, (i) => i.requisition)
  items: RequisitionItem[];
}
