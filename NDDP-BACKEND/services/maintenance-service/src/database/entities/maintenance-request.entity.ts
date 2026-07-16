import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AssetReferenceType, MaintenancePriority, RequestStatus } from '../../common/enums';
import { MaintenanceCategory } from './maintenance-category.entity';

@Entity('maintenance_requests')
@Index('idx_maintenance_requests_number', ['requestNumber'], { unique: true })
export class MaintenanceRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'request_number', type: 'varchar', length: 50, unique: true })
  requestNumber: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @Column({ name: 'asset_type', type: 'enum', enum: AssetReferenceType })
  assetType: AssetReferenceType;

  @Column({ name: 'asset_id', type: 'uuid' })
  assetId: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.SUBMITTED })
  status: RequestStatus;

  @Column({ type: 'enum', enum: MaintenancePriority, default: MaintenancePriority.ROUTINE })
  priority: MaintenancePriority;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string | null;

  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  reviewerId: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => MaintenanceCategory)
  @JoinColumn({ name: 'category_id' })
  category: MaintenanceCategory;
}
