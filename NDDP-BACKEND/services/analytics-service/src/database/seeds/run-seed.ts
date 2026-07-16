import dataSource from '../data-source';
import { MetricDefinition } from '../entities/metric-definition.entity';
import { DEFAULT_METRIC_DEFINITIONS } from '../../common/constants';
import { MetricDomain, AggregationType, MetricStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(MetricDefinition);

  for (const m of DEFAULT_METRIC_DEFINITIONS) {
    const exists = await repo.findOne({ where: { code: m.code } });
    if (!exists) {
      await repo.save({
        code: m.code,
        name: m.name,
        domain: m.domain as MetricDomain,
        aggregationType: m.aggregationType as AggregationType,
        unit: m.unit,
        status: MetricStatus.ACTIVE,
      });
      console.log(`Seeded metric definition: ${m.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Analytics seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
