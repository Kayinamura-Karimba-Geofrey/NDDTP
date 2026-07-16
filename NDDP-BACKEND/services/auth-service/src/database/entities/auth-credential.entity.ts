import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AccountStatus } from '../../common/enums';
import { RefreshToken } from './refresh-token.entity';
import { UserSession } from './user-session.entity';
import { MfaSetting } from './mfa-setting.entity';
import { LoginAttempt } from './login-attempt.entity';

@Entity('auth_credentials')
@Index('idx_auth_credentials_email', ['email'], { unique: true })
@Index('idx_auth_credentials_user_id', ['userId'], { unique: true })
@Index('idx_auth_credentials_status', ['status'])
export class AuthCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  userId: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING_VERIFICATION,
  })
  status: AccountStatus;

  @Column({ name: 'email_verified', type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ name: 'email_verified_at', type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;

  @Column({ name: 'failed_login_attempts', type: 'int', default: 0 })
  failedLoginAttempts: number;

  @Column({ name: 'locked_until', type: 'timestamptz', nullable: true })
  lockedUntil: Date | null;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ name: 'last_password_change_at', type: 'timestamptz', nullable: true })
  lastPasswordChangeAt: Date | null;

  @Column({ name: 'must_change_password', type: 'boolean', default: false })
  mustChangePassword: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => RefreshToken, (token) => token.credential)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserSession, (session) => session.credential)
  sessions: UserSession[];

  @OneToOne(() => MfaSetting, (mfa) => mfa.credential)
  mfaSetting: MfaSetting;

  @OneToMany(() => LoginAttempt, (attempt) => attempt.credential)
  loginAttempts: LoginAttempt[];
}
