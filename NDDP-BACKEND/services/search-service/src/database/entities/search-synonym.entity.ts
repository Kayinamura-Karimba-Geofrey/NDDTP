import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('search_synonyms')
@Index('idx_search_synonyms_term', ['term'], { unique: true })
export class SearchSynonym {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  term: string;

  @Column({ type: 'jsonb' })
  synonyms: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
