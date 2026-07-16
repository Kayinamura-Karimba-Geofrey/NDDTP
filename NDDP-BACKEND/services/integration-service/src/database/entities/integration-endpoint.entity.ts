import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { EndpointStatus, HttpMethod } from '../../common/enums';
import { IntegrationConnector } from './integration-connector.entity';

@Entity('integration_endpoints')
@Index('idx_integration_endpoints_connector_code', ['connectorId', 'code'], { unique: true })
export class IntegrationEndpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'connector_id', type: 'uuid' })
  connectorId: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  @Column({ name: 'http_method', type: 'enum', enum: HttpMethod, default: HttpMethod.GET })
  httpMethod: HttpMethod;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', nullable: true })
  mapping: Record<string, unknown> | null;

  @Column({ type: 'enum', enum: EndpointStatus, default: EndpointStatus.ACTIVE })
  status: EndpointStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => IntegrationConnector, (c) => c.endpoints)
  @JoinColumn({ name: 'connector_id' })
  connector: IntegrationConnector;
}
