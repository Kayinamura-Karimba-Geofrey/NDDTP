import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { FitnessClassification, FitnessStatus } from '../../common/enums';

@Entity('fitness_assessments')
@Index('idx_fitness_assessments_user', ['userId'])
@Index('idx_fitness_assessments_status', ['status'])
export class FitnessAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: FitnessClassification })
  classification: FitnessClassification;

  @Column({ type: 'enum', enum: FitnessStatus, default: FitnessStatus.ACTIVE })
  status: FitnessStatus;

  @Column({ type: 'text', nullable: true })
  restrictions: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'assessed_by', type: 'uuid' })
  assessedBy: string;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
