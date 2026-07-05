import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { IndexType, IndexStatus } from '../../common/enums';
import { SearchDocument } from './search-document.entity';

@Entity('search_indexes')
@Index('idx_search_indexes_code', ['code'], { unique: true })
export class SearchIndex {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'index_type', type: 'enum', enum: IndexType })
  indexType: IndexType;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: IndexStatus, default: IndexStatus.ACTIVE })
  status: IndexStatus;

  @OneToMany(() => SearchDocument, (d) => d.index)
  documents: SearchDocument[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
