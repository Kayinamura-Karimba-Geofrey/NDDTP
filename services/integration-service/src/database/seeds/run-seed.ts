import dataSource from '../data-source';
import { IntegrationConnector } from '../entities/integration-connector.entity';
import { DEFAULT_CONNECTORS } from '../../common/constants';
import { ConnectorStatus, ConnectorType } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(IntegrationConnector);

  for (const c of DEFAULT_CONNECTORS) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({
        code: c.code,
        name: c.name,
        connectorType: c.connectorType as ConnectorType,
        baseUrl: c.baseUrl,
        status: ConnectorStatus.ACTIVE,
      });
      console.log(`Seeded connector: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Integration seed complete');
}

seed().catch((err) => { console.error(err); process.exit(1); });
