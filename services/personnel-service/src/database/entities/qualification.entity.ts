import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { QualificationCategory } from '../../common/enums';

@Entity('qualifications')
@Index('idx_qualifications_code', ['code'], { unique: true })
export class Qualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: QualificationCategory })
  category: QualificationCategory;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'validity_months', type: 'int', nullable: true })
  validityMonths: number | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
