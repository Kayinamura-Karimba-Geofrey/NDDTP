import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BiReportType, ReportDefinitionStatus } from '../../common/enums';
import { SemanticModel } from './semantic-model.entity';
import { BiReportExecution } from './bi-report-execution.entity';

@Entity('bi_report_definitions')
@Index('idx_bi_report_definitions_code', ['code'], { unique: true })
export class BiReportDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'model_id', type: 'uuid' })
  modelId: string;

  @ManyToOne(() => SemanticModel, (m) => m.reports)
  @JoinColumn({ name: 'model_id' })
  model: SemanticModel;

  @Column({ name: 'report_type', type: 'enum', enum: BiReportType })
  reportType: BiReportType;

  @Column({ type: 'jsonb', nullable: true })
  layout: Record<string, unknown> | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ReportDefinitionStatus, default: ReportDefinitionStatus.ACTIVE })
  status: ReportDefinitionStatus;

  @OneToMany(() => BiReportExecution, (e) => e.report)
  executions: BiReportExecution[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
