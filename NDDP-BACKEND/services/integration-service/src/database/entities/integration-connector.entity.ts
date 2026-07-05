import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { ConnectorStatus, ConnectorType } from '../../common/enums';
import { IntegrationEndpoint } from './integration-endpoint.entity';

@Entity('integration_connectors')
@Index('idx_integration_connectors_code', ['code'], { unique: true })
export class IntegrationConnector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'connector_type', type: 'enum', enum: ConnectorType })
  connectorType: ConnectorType;

  @Column({ name: 'base_url', type: 'varchar', length: 500 })
  baseUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', nullable: true })
  config: Record<string, unknown> | null;

  @Column({ type: 'enum', enum: ConnectorStatus, default: ConnectorStatus.ACTIVE })
  status: ConnectorStatus;

  @OneToMany(() => IntegrationEndpoint, (e) => e.connector)
  endpoints: IntegrationEndpoint[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
