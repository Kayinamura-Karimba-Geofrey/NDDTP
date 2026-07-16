import dataSource from '../data-source';
import { RetentionPolicy } from '../entities';

const DEFAULT_POLICIES = [
  { category: 'AUTHENTICATION', retentionDays: 2555, description: 'Authentication events — 7 years' },
  { category: 'AUTHORIZATION', retentionDays: 2555, description: 'Authorization events — 7 years' },
  { category: 'USER_MANAGEMENT', retentionDays: 2555, description: 'User management events — 7 years' },
  { category: 'NOTIFICATION', retentionDays: 365, description: 'Notification events — 1 year' },
  { category: 'SECURITY', retentionDays: 2555, description: 'Security events — 7 years' },
  { category: 'SYSTEM', retentionDays: 365, description: 'System events — 1 year' },
  { category: 'DATA_ACCESS', retentionDays: 2555, description: 'Data access events — 7 years' },
];

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(RetentionPolicy);

  for (const policy of DEFAULT_POLICIES) {
    const existing = await repo.findOne({ where: { category: policy.category } });
    if (!existing) {
      await repo.save(repo.create(policy));
      console.log(`Created retention policy: ${policy.category}`);
    }
  }

  await dataSource.destroy();
  console.log('Audit service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
