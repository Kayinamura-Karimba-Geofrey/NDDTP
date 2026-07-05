import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { NamespaceStatus } from '../../common/enums';
import { ConfigEntry } from './config-entry.entity';

@Entity('config_namespaces')
@Index('idx_config_namespaces_code', ['code'], { unique: true })
export class ConfigNamespace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: NamespaceStatus, default: NamespaceStatus.ACTIVE })
  status: NamespaceStatus;

  @OneToMany(() => ConfigEntry, (e) => e.namespace)
  entries: ConfigEntry[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
