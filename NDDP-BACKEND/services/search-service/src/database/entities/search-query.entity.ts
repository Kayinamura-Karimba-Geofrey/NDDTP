import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { QueryStatus } from '../../common/enums';

@Entity('search_queries')
@Index('idx_search_queries_status', ['status'])
@Index('idx_search_queries_number', ['queryNumber'], { unique: true })
export class SearchQuery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'query_number', type: 'varchar', length: 50, unique: true })
  queryNumber: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ name: 'index_id', type: 'uuid', nullable: true })
  indexId: string | null;

  @Column({ type: 'varchar', length: 500 })
  query: string;

  @Column({ type: 'enum', enum: QueryStatus, default: QueryStatus.PENDING })
  status: QueryStatus;

  @Column({ name: 'hit_count', type: 'int', default: 0 })
  hitCount: number;

  @Column({ type: 'jsonb', nullable: true })
  results: Array<{ documentId: string; title: string; score: number }> | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
