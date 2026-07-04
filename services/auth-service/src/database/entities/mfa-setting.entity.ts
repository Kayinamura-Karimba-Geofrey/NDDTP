import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { MfaMethod, MfaStatus } from '../../common/enums';
import { AuthCredential } from './auth-credential.entity';
import { MfaBackupCode } from './mfa-backup-code.entity';

@Entity('mfa_settings')
@Index('idx_mfa_settings_credential_id', ['credentialId'], { unique: true })
export class MfaSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'credential_id', type: 'uuid', unique: true })
  credentialId: string;

  @Column({
    type: 'enum',
    enum: MfaStatus,
    default: MfaStatus.DISABLED,
  })
  status: MfaStatus;

  @Column({
    type: 'enum',
    enum: MfaMethod,
    default: MfaMethod.TOTP,
  })
  method: MfaMethod;

  @Column({ name: 'secret_encrypted', type: 'varchar', length: 512, nullable: true })
  secretEncrypted: string | null;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phoneNumber: string | null;

  @Column({ name: 'enabled_at', type: 'timestamptz', nullable: true })
  enabledAt: Date | null;

  @Column({ name: 'last_used_at', type: 'timestamptz', nullable: true })
  lastUsedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => AuthCredential, (credential) => credential.mfaSetting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'credential_id' })
  credential: AuthCredential;

  @OneToMany(() => MfaBackupCode, (code) => code.mfaSetting)
  backupCodes: MfaBackupCode[];
}
