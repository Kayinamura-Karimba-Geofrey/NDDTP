import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('config_overrides')
@Index('idx_config_overrides_scope_key', ['scopeType', 'scopeRef', 'entryKey'], { unique: true })
export class ConfigOverride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'scope_type', type: 'varchar', length: 50 })
  scopeType: string;

  @Column({ name: 'scope_ref', type: 'varchar', length: 100 })
  scopeRef: string;

  @Column({ name: 'entry_key', type: 'varchar', length: 200 })
  entryKey: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
