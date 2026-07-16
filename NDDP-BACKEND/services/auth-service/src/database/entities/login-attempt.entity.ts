import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LoginAttemptResult } from '../../common/enums';
import { AuthCredential } from './auth-credential.entity';

@Entity('login_attempts')
@Index('idx_login_attempts_credential_id', ['credentialId'])
@Index('idx_login_attempts_email', ['email'])
@Index('idx_login_attempts_ip_address', ['ipAddress'])
@Index('idx_login_attempts_created_at', ['createdAt'])
export class LoginAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'credential_id', type: 'uuid', nullable: true })
  credentialId: string | null;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({
    type: 'enum',
    enum: LoginAttemptResult,
  })
  result: LoginAttemptResult;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string | null;

  @Column({ name: 'failure_reason', type: 'varchar', length: 255, nullable: true })
  failureReason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => AuthCredential, (credential) => credential.loginAttempts, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'credential_id' })
  credential: AuthCredential | null;
}
