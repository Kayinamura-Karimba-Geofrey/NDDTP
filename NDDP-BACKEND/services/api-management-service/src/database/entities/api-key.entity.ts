import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ApiKeyStatus } from '../../common/enums';
import { ApiConsumer } from './api-consumer.entity';

@Entity('api_keys')
@Index('idx_api_keys_prefix', ['keyPrefix'], { unique: true })
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'consumer_id', type: 'uuid' })
  consumerId: string;

  @Column({ name: 'key_prefix', type: 'varchar', length: 20, unique: true })
  keyPrefix: string;

  @Column({ name: 'key_hash', type: 'varchar', length: 128 })
  keyHash: string;

  @Column({ type: 'enum', enum: ApiKeyStatus, default: ApiKeyStatus.ACTIVE })
  status: ApiKeyStatus;

  @Column({ name: 'issued_by', type: 'uuid' })
  issuedBy: string;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => ApiConsumer, (c) => c.keys)
  @JoinColumn({ name: 'consumer_id' })
  consumer: ApiConsumer;
}
