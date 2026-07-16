import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { WorkflowInstance } from './workflow-instance.entity';

@Entity('workflow_logs')
@Index('idx_workflow_logs_instance', ['instanceId'])
export class WorkflowLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'instance_id', type: 'uuid' })
  instanceId: string;

  @Column({ name: 'event_type', type: 'varchar', length: 50 })
  eventType: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'recorded_by', type: 'uuid' })
  recordedBy: string;

  @CreateDateColumn({ name: 'recorded_at', type: 'timestamptz' })
  recordedAt: Date;

  @ManyToOne(() => WorkflowInstance)
  @JoinColumn({ name: 'instance_id' })
  instance: WorkflowInstance;
}
