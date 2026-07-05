import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EntryValueType, EntryStatus, EnvironmentScope } from '../../common/enums';
import { ConfigNamespace } from './config-namespace.entity';
import { ConfigRevision } from './config-revision.entity';

@Entity('config_entries')
@Index('idx_config_entries_namespace_key', ['namespaceId', 'key'], { unique: true })
export class ConfigEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'namespace_id', type: 'uuid' })
  namespaceId: string;

  @ManyToOne(() => ConfigNamespace, (n) => n.entries)
  @JoinColumn({ name: 'namespace_id' })
  namespace: ConfigNamespace;

  @Column({ type: 'varchar', length: 200 })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ name: 'value_type', type: 'enum', enum: EntryValueType, default: EntryValueType.STRING })
  valueType: EntryValueType;

  @Column({ type: 'enum', enum: EntryStatus, default: EntryStatus.DRAFT })
  status: EntryStatus;

  @Column({ type: 'enum', enum: EnvironmentScope, default: EnvironmentScope.ALL })
  environment: EnvironmentScope;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @OneToMany(() => ConfigRevision, (r) => r.entry)
  revisions: ConfigRevision[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
