import dataSource from '../data-source';
import { BackupPolicy } from '../entities/backup-policy.entity';
import { DEFAULT_BACKUP_POLICIES } from '../../common/constants';
import { BackupType, TargetType, PolicyStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(BackupPolicy);

  for (const p of DEFAULT_BACKUP_POLICIES) {
    const exists = await repo.findOne({ where: { code: p.code } });
    if (!exists) {
      await repo.save({
        code: p.code,
        name: p.name,
        backupType: p.backupType as BackupType,
        targetType: p.targetType as TargetType,
        schedule: p.schedule,
        retentionDays: p.retentionDays,
        status: PolicyStatus.ACTIVE,
      });
      console.log(`Seeded backup policy: ${p.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Backup seed complete');
}

seed().catch((err) => { console.error(err); process.exit(1); });
