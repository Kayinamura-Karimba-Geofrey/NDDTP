import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  Index, OneToMany,
} from 'typeorm';
import { Application } from './application.entity';

@Entity('candidates')
@Index('idx_candidates_email', ['email'], { unique: true })
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string | null;

  @Column({ name: 'national_id', type: 'varchar', length: 50, nullable: true })
  nationalId: string | null;

  @Column({ name: 'resume_url', type: 'varchar', length: 500, nullable: true })
  resumeUrl: string | null;

  @Column({ name: 'linked_user_id', type: 'uuid', nullable: true })
  linkedUserId: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Application, (a) => a.candidate)
  applications: Application[];
}
