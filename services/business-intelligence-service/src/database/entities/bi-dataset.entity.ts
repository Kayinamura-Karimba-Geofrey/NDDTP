import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { DataSourceType, DatasetStatus } from '../../common/enums';
import { SemanticModel } from './semantic-model.entity';

@Entity('bi_datasets')
@Index('idx_bi_datasets_code', ['code'], { unique: true })
export class BiDataset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'source_type', type: 'enum', enum: DataSourceType })
  sourceType: DataSourceType;

  @Column({ type: 'jsonb', nullable: true })
  schema: Record<string, unknown> | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: DatasetStatus, default: DatasetStatus.ACTIVE })
  status: DatasetStatus;

  @OneToMany(() => SemanticModel, (m) => m.dataset)
  models: SemanticModel[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
