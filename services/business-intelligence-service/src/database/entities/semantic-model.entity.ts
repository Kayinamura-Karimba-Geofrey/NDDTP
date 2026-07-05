import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ModelStatus } from '../../common/enums';
import { BiDataset } from './bi-dataset.entity';
import { BiReportDefinition } from './bi-report-definition.entity';

@Entity('semantic_models')
@Index('idx_semantic_models_code', ['code'], { unique: true })
export class SemanticModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'dataset_id', type: 'uuid' })
  datasetId: string;

  @ManyToOne(() => BiDataset, (d) => d.models)
  @JoinColumn({ name: 'dataset_id' })
  dataset: BiDataset;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  dimensions: Array<{ name: string; field: string; type: string }>;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  measures: Array<{ name: string; field: string; aggregation: string }>;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ModelStatus, default: ModelStatus.DRAFT })
  status: ModelStatus;

  @OneToMany(() => BiReportDefinition, (r) => r.model)
  reports: BiReportDefinition[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
