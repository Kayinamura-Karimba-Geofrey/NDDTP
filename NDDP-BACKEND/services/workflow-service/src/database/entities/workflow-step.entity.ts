import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { WorkflowDefinition } from './workflow-definition.entity';

@Entity('workflow_steps')
@Index('idx_workflow_steps_definition_order', ['definitionId', 'stepOrder'], { unique: true })
export class WorkflowStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'definition_id', type: 'uuid' })
  definitionId: string;

  @Column({ name: 'step_order', type: 'int' })
  stepOrder: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'approver_role', type: 'varchar', length: 50 })
  approverRole: string;

  @Column({ name: 'is_required', type: 'boolean', default: true })
  isRequired: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => WorkflowDefinition, (d) => d.steps)
  @JoinColumn({ name: 'definition_id' })
  definition: WorkflowDefinition;
}
