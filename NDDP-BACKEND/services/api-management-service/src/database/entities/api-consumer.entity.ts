import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { ConsumerStatus } from '../../common/enums';
import { ApiKey } from './api-key.entity';

@Entity('api_consumers')
@Index('idx_api_consumers_code', ['code'], { unique: true })
export class ApiConsumer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'contact_email', type: 'varchar', length: 200, nullable: true })
  contactEmail: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ConsumerStatus, default: ConsumerStatus.ACTIVE })
  status: ConsumerStatus;

  @OneToMany(() => ApiKey, (k) => k.consumer)
  keys: ApiKey[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
