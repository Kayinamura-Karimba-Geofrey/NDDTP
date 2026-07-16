import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { OutputFormat, OutputStatus } from '../../common/enums';
import { ReportRequest } from './report-request.entity';

@Entity('report_outputs')
@Index('idx_report_outputs_request', ['requestId'])
export class ReportOutput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'request_id', type: 'uuid' })
  requestId: string;

  @Column({ name: 'output_format', type: 'enum', enum: OutputFormat })
  outputFormat: OutputFormat;

  @Column({ name: 'file_path', type: 'varchar', length: 500, nullable: true })
  filePath: string | null;

  @Column({ name: 'record_count', type: 'int', default: 0 })
  recordCount: number;

  @Column({ type: 'enum', enum: OutputStatus, default: OutputStatus.GENERATED })
  status: OutputStatus;

  @Column({ name: 'generated_at', type: 'timestamptz' })
  generatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => ReportRequest)
  @JoinColumn({ name: 'request_id' })
  request: ReportRequest;
}
