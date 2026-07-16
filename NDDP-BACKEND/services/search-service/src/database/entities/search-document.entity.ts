import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentStatus } from '../../common/enums';
import { SearchIndex } from './search-index.entity';

@Entity('search_documents')
@Index('idx_search_documents_index_external', ['indexId', 'externalId'], { unique: true })
@Index('idx_search_documents_status', ['status'])
export class SearchDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'index_id', type: 'uuid' })
  indexId: string;

  @ManyToOne(() => SearchIndex, (i) => i.documents)
  @JoinColumn({ name: 'index_id' })
  index: SearchIndex;

  @Column({ name: 'external_id', type: 'varchar', length: 100 })
  externalId: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column({ type: 'enum', enum: DocumentStatus, default: DocumentStatus.PENDING })
  status: DocumentStatus;

  @Column({ name: 'indexed_at', type: 'timestamptz', nullable: true })
  indexedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
