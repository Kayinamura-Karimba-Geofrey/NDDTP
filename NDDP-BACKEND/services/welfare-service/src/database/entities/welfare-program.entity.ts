import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany,
} from 'typeorm';
import { ProgramCategory, ProgramStatus } from '../../common/enums';
import { WelfareClaim } from './welfare-claim.entity';

@Entity('welfare_programs')
@Index('idx_welfare_programs_code', ['code'], { unique: true })
export class WelfareProgram {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: ProgramCategory })
  category: ProgramCategory;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'max_amount', type: 'decimal', precision: 12, scale: 2, default: 0 })
  maxAmount: number;

  @Column({ name: 'eligibility_criteria', type: 'jsonb', nullable: true })
  eligibilityCriteria: Record<string, unknown> | null;

  @Column({ type: 'enum', enum: ProgramStatus, default: ProgramStatus.ACTIVE })
  status: ProgramStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => WelfareClaim, (c) => c.program)
  claims: WelfareClaim[];
}
