import { createHash } from 'crypto';
import * as bcrypt from 'bcrypt';
import dataSource from '../data-source';
import { AuthCredential } from '../entities/auth-credential.entity';
import { MfaSetting } from '../entities/mfa-setting.entity';
import { MfaBackupCode } from '../entities/mfa-backup-code.entity';
import { AccountStatus, MfaMethod, MfaStatus } from '../../common/enums';
import { DEMO_USERS, DEMO_PASSWORD, DEMO_MFA_OTP } from '../../../../../shared-seeds/demo-users';

function hashBackupCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

async function seed(): Promise<void> {
  await dataSource.initialize();
  const credentialRepo = dataSource.getRepository(AuthCredential);
  const mfaRepo = dataSource.getRepository(MfaSetting);
  const backupRepo = dataSource.getRepository(MfaBackupCode);

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  for (const user of DEMO_USERS) {
    let credential = await credentialRepo.findOne({ where: { email: user.email } });

    if (!credential) {
      credential = await credentialRepo.save(
        credentialRepo.create({
          userId: user.id,
          email: user.email.toLowerCase(),
          passwordHash,
          status: AccountStatus.ACTIVE,
          emailVerified: true,
          emailVerifiedAt: new Date(),
          lastPasswordChangeAt: new Date(),
        }),
      );
      console.log(`Created auth credential: ${user.email}`);
    } else {
      await credentialRepo.update(credential.id, {
        passwordHash,
        status: AccountStatus.ACTIVE,
        emailVerified: true,
      });
      console.log(`Updated auth credential: ${user.email}`);
    }

    if (user.mfaEnabled) {
      let mfa = await mfaRepo.findOne({ where: { credentialId: credential.id } });
      if (!mfa) {
        mfa = await mfaRepo.save(
          mfaRepo.create({
            credentialId: credential.id,
            status: MfaStatus.ENABLED,
            method: MfaMethod.TOTP,
            secretEncrypted: Buffer.from('JBSWY3DPEHPK3PXP').toString('base64'),
            enabledAt: new Date(),
          }),
        );
        console.log(`Enabled MFA for: ${user.email}`);
      }

      const backupHash = hashBackupCode(DEMO_MFA_OTP);
      const existingBackup = await backupRepo.findOne({
        where: { mfaSettingId: mfa.id, codeHash: backupHash },
      });
      if (!existingBackup) {
        await backupRepo.save(
          backupRepo.create({
            mfaSettingId: mfa.id,
            codeHash: backupHash,
            isUsed: false,
          }),
        );
        console.log(`MFA backup code seeded for ${user.email} (OTP: ${DEMO_MFA_OTP})`);
      }
    }
  }

  await dataSource.destroy();
  console.log('Auth service integration seed complete');
}

seed().catch((e) => {
  console.error('Auth seed failed:', e);
  process.exit(1);
});
