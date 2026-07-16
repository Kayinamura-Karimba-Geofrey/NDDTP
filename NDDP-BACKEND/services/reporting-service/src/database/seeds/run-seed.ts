import dataSource from '../data-source';
import { ReportDefinition } from '../entities/report-definition.entity';
import { DEFAULT_REPORT_DEFINITIONS } from '../../common/constants';
import { ReportType, ReportCategory, OutputFormat, DefinitionStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(ReportDefinition);

  for (const d of DEFAULT_REPORT_DEFINITIONS) {
    const exists = await repo.findOne({ where: { code: d.code } });
    if (!exists) {
      await repo.save({
        code: d.code,
        name: d.name,
        reportType: d.reportType as ReportType,
        category: d.category as ReportCategory,
        outputFormat: d.outputFormat as OutputFormat,
        status: DefinitionStatus.ACTIVE,
      });
      console.log(`Seeded report definition: ${d.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Reporting seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
