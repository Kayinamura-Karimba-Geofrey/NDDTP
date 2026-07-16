import dataSource from '../data-source';
import { MonitoringTarget } from '../entities/monitoring-target.entity';
import { DEFAULT_MONITORING_TARGETS } from '../../common/constants';
import { TargetType, TargetStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(MonitoringTarget);

  for (const t of DEFAULT_MONITORING_TARGETS) {
    const exists = await repo.findOne({ where: { code: t.code } });
    if (!exists) {
      await repo.save({
        code: t.code,
        name: t.name,
        targetType: t.targetType as TargetType,
        endpointUrl: t.endpointUrl,
        checkIntervalSeconds: t.checkIntervalSeconds,
        status: TargetStatus.ACTIVE,
      });
      console.log(`Seeded monitoring target: ${t.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Monitoring seed complete');
}

seed().catch((err) => { console.error(err); process.exit(1); });
