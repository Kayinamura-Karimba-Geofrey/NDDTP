import dataSource from '../data-source';
import { LeaveType } from '../entities/leave-type.entity';
import { DEFAULT_LEAVE_TYPES } from '../../common/constants';
import { AccrualType } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(LeaveType);

  for (const lt of DEFAULT_LEAVE_TYPES) {
    const exists = await repo.findOne({ where: { code: lt.code } });
    if (!exists) {
      await repo.save(repo.create({
        code: lt.code,
        name: lt.name,
        defaultDays: lt.defaultDays,
        accrualType: lt.accrualType as AccrualType,
        requiresApproval: lt.requiresApproval,
        maxConsecutiveDays: lt.maxConsecutiveDays,
      }));
      console.log(`Created leave type: ${lt.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Leave service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
