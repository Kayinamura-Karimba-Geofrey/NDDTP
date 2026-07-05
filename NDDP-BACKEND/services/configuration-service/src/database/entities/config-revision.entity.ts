import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ConfigEntry } from './config-entry.entity';

@Entity('config_revisions')
@Index('idx_config_revisions_entry', ['entryId'])
export class ConfigRevision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'entry_id', type: 'uuid' })
  entryId: string;

  @ManyToOne(() => ConfigEntry, (e) => e.revisions)
  @JoinColumn({ name: 'entry_id' })
  entry: ConfigEntry;

  @Column({ name: 'previous_value', type: 'text', nullable: true })
  previousValue: string | null;

  @Column({ name: 'new_value', type: 'text' })
  newValue: string;

  @Column({ name: 'changed_by', type: 'uuid' })
  changedBy: string;

  @Column({ type: 'int' })
  version: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
