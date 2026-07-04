import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MfaSetting } from '../../../database/entities/mfa-setting.entity';
import { MfaBackupCode } from '../../../database/entities/mfa-backup-code.entity';
import { MfaStatus } from '../../../common/enums';

@Injectable()
export class MfaRepository {
  constructor(
    @InjectRepository(MfaSetting)
    private readonly mfaRepository: Repository<MfaSetting>,
    @InjectRepository(MfaBackupCode)
    private readonly backupCodeRepository: Repository<MfaBackupCode>,
  ) {}

  async findByCredentialId(credentialId: string): Promise<MfaSetting | null> {
    return this.mfaRepository.findOne({
      where: { credentialId },
      relations: ['backupCodes'],
    });
  }

  async createOrUpdate(credentialId: string, data: Partial<MfaSetting>): Promise<MfaSetting> {
    let setting = await this.findByCredentialId(credentialId);

    if (setting) {
      Object.assign(setting, data);
    } else {
      setting = this.mfaRepository.create({ credentialId, ...data });
    }

    return this.mfaRepository.save(setting);
  }

  async enableMfa(credentialId: string): Promise<void> {
    await this.mfaRepository.update(
      { credentialId },
      { status: MfaStatus.ENABLED, enabledAt: new Date() },
    );
  }

  async disableMfa(credentialId: string): Promise<void> {
    await this.mfaRepository.update(
      { credentialId },
      {
        status: MfaStatus.DISABLED,
        secretEncrypted: null,
        enabledAt: null,
      },
    );
    await this.backupCodeRepository.delete({ mfaSettingId: credentialId });
  }

  async updateLastUsed(credentialId: string): Promise<void> {
    await this.mfaRepository.update({ credentialId }, { lastUsedAt: new Date() });
  }

  async createBackupCodes(mfaSettingId: string, codeHashes: string[]): Promise<void> {
    const codes = codeHashes.map((codeHash) =>
      this.backupCodeRepository.create({ mfaSettingId, codeHash }),
    );
    await this.backupCodeRepository.save(codes);
  }

  async findUnusedBackupCode(
    mfaSettingId: string,
    codeHash: string,
  ): Promise<MfaBackupCode | null> {
    return this.backupCodeRepository.findOne({
      where: { mfaSettingId, codeHash, isUsed: false },
    });
  }

  async markBackupCodeUsed(id: string): Promise<void> {
    await this.backupCodeRepository.update(id, {
      isUsed: true,
      usedAt: new Date(),
    });
  }

  async deleteBackupCodes(mfaSettingId: string): Promise<void> {
    await this.backupCodeRepository.delete({ mfaSettingId });
  }
}
