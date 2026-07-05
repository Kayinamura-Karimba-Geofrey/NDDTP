import dataSource from '../data-source';
import { BiDataset } from '../entities/bi-dataset.entity';
import { SemanticModel } from '../entities/semantic-model.entity';
import { DEFAULT_DATASETS, DEFAULT_SEMANTIC_MODELS } from '../../common/constants';
import { DataSourceType, DatasetStatus, ModelStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const datasetRepo = dataSource.getRepository(BiDataset);
  const modelRepo = dataSource.getRepository(SemanticModel);

  const datasetMap = new Map<string, string>();

  for (const d of DEFAULT_DATASETS) {
    let dataset = await datasetRepo.findOne({ where: { code: d.code } });
    if (!dataset) {
      dataset = await datasetRepo.save({
        code: d.code,
        name: d.name,
        sourceType: d.sourceType as DataSourceType,
        status: DatasetStatus.ACTIVE,
      });
      console.log(`Seeded dataset: ${d.code}`);
    }
    datasetMap.set(d.code, dataset.id);
  }

  for (const m of DEFAULT_SEMANTIC_MODELS) {
    const exists = await modelRepo.findOne({ where: { code: m.code } });
    if (!exists) {
      const datasetId = datasetMap.get(m.datasetCode);
      if (datasetId) {
        await modelRepo.save({
          code: m.code,
          name: m.name,
          datasetId,
          dimensions: [{ name: 'Period', field: 'period', type: 'date' }],
          measures: [{ name: 'Total', field: 'total', aggregation: 'sum' }],
          status: ModelStatus.ACTIVE,
        });
        console.log(`Seeded semantic model: ${m.code}`);
      }
    }
  }

  await dataSource.destroy();
  console.log('Business Intelligence seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
