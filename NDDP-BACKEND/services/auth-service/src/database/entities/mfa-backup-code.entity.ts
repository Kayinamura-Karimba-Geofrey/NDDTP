import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MfaSetting } from './mfa-setting.entity';

@Entity('mfa_backup_codes')
@Index('idx_mfa_backup_codes_mfa_setting_id', ['mfaSettingId'])
@Index('idx_mfa_backup_codes_code_hash', ['codeHash'])
export class MfaBackupCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mfa_setting_id', type: 'uuid' })
  mfaSettingId: string;

  @Column({ name: 'code_hash', type: 'varchar', length: 255 })
  codeHash: string;

  @Column({ name: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @Column({ name: 'used_at', type: 'timestamptz', nullable: true })
  usedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => MfaSetting, (mfa) => mfa.backupCodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mfa_setting_id' })
  mfaSetting: MfaSetting;
}
