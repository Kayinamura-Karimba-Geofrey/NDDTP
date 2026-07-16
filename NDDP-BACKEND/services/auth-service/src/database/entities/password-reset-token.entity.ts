import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TokenType } from '../../common/enums';
import { AuthCredential } from './auth-credential.entity';

@Entity('password_reset_tokens')
@Index('idx_password_reset_tokens_token_hash', ['tokenHash'], { unique: true })
@Index('idx_password_reset_tokens_credential_id', ['credentialId'])
@Index('idx_password_reset_tokens_expires_at', ['expiresAt'])
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'credential_id', type: 'uuid' })
  credentialId: string;

  @Column({ name: 'token_hash', type: 'varchar', length: 255, unique: true })
  tokenHash: string;

  @Column({
    name: 'token_type',
    type: 'enum',
    enum: TokenType,
    default: TokenType.PASSWORD_RESET,
  })
  tokenType: TokenType;

  @Column({ name: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @Column({ name: 'used_at', type: 'timestamptz', nullable: true })
  usedAt: Date | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => AuthCredential, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credential_id' })
  credential: AuthCredential;
}
