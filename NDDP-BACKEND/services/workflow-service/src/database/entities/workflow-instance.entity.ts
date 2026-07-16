import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { WorkflowEntityType, InstanceStatus } from '../../common/enums';
import { WorkflowDefinition } from './workflow-definition.entity';

@Entity('workflow_instances')
@Index('idx_workflow_instances_number', ['instanceNumber'], { unique: true })
export class WorkflowInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'instance_number', type: 'varchar', length: 50, unique: true })
  instanceNumber: string;

  @Column({ name: 'definition_id', type: 'uuid' })
  definitionId: string;

  @Column({ name: 'entity_type', type: 'enum', enum: WorkflowEntityType })
  entityType: WorkflowEntityType;

  @Column({ name: 'entity_id', type: 'uuid' })
  entityId: string;

  @Column({ name: 'initiated_by', type: 'uuid' })
  initiatedBy: string;

  @Column({ type: 'enum', enum: InstanceStatus, default: InstanceStatus.DRAFT })
  status: InstanceStatus;

  @Column({ name: 'current_step', type: 'int', default: 0 })
  currentStep: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => WorkflowDefinition)
  @JoinColumn({ name: 'definition_id' })
  definition: WorkflowDefinition;
}
