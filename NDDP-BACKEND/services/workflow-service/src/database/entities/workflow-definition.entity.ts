import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { WorkflowEntityType, DefinitionStatus } from '../../common/enums';
import { WorkflowStep } from './workflow-step.entity';

@Entity('workflow_definitions')
@Index('idx_workflow_definitions_code', ['code'], { unique: true })
export class WorkflowDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'entity_type', type: 'enum', enum: WorkflowEntityType })
  entityType: WorkflowEntityType;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: DefinitionStatus, default: DefinitionStatus.ACTIVE })
  status: DefinitionStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => WorkflowStep, (s) => s.definition)
  steps: WorkflowStep[];
}
