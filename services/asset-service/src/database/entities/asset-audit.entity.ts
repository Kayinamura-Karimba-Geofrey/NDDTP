import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { AuditStatus } from '../../common/enums';

@Entity('asset_audits')
@Index('idx_asset_audits_number', ['auditNumber'], { unique: true })
@Index('idx_asset_audits_unit', ['unitId'])
export class AssetAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'audit_number', type: 'varchar', length: 50, unique: true })
  auditNumber: string;

  @Column({ name: 'unit_id', type: 'uuid' })
  unitId: string;

  @Column({ name: 'conducted_by', type: 'uuid' })
  conductedBy: string;

  @Column({ name: 'audit_date', type: 'date' })
  auditDate: string;

  @Column({ type: 'enum', enum: AuditStatus, default: AuditStatus.SCHEDULED })
  status: AuditStatus;

  @Column({ type: 'jsonb', nullable: true })
  findings: Record<string, unknown>[] | null;

  @Column({ type: 'text', nullable: true })
  summary: string | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
