import dataSource from '../data-source';
import { ConfigNamespace } from '../entities/config-namespace.entity';
import { ConfigEntry } from '../entities/config-entry.entity';
import { DEFAULT_NAMESPACES, DEFAULT_ENTRIES } from '../../common/constants';
import { NamespaceStatus, EntryValueType, EntryStatus, EnvironmentScope } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const nsRepo = dataSource.getRepository(ConfigNamespace);
  const entryRepo = dataSource.getRepository(ConfigEntry);
  const namespaceMap = new Map<string, string>();

  for (const ns of DEFAULT_NAMESPACES) {
    let namespace = await nsRepo.findOne({ where: { code: ns.code } });
    if (!namespace) {
      namespace = await nsRepo.save({ code: ns.code, name: ns.name, status: NamespaceStatus.ACTIVE });
      console.log(`Seeded namespace: ${ns.code}`);
    }
    namespaceMap.set(ns.code, namespace.id);
  }

  for (const e of DEFAULT_ENTRIES) {
    const namespaceId = namespaceMap.get(e.namespaceCode);
    if (!namespaceId) continue;
    const exists = await entryRepo.findOne({ where: { namespaceId, key: e.key } });
    if (!exists) {
      await entryRepo.save({
        namespaceId,
        key: e.key,
        value: e.value,
        valueType: e.valueType as EntryValueType,
        status: EntryStatus.ACTIVE,
        environment: EnvironmentScope.ALL,
        createdBy: '00000000-0000-0000-0000-000000000001',
      });
      console.log(`Seeded entry: ${e.key}`);
    }
  }

  await dataSource.destroy();
  console.log('Configuration seed complete');
}

seed().catch((err) => { console.error(err); process.exit(1); });
