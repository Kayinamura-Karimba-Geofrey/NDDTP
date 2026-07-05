import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ReportType, ReportCategory, OutputFormat, DefinitionStatus } from '../../common/enums';

@Entity('report_definitions')
@Index('idx_report_definitions_code', ['code'], { unique: true })
export class ReportDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'report_type', type: 'enum', enum: ReportType })
  reportType: ReportType;

  @Column({ type: 'enum', enum: ReportCategory })
  category: ReportCategory;

  @Column({ name: 'output_format', type: 'enum', enum: OutputFormat, default: OutputFormat.PDF })
  outputFormat: OutputFormat;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: DefinitionStatus, default: DefinitionStatus.ACTIVE })
  status: DefinitionStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
