import dataSource from '../data-source';
import { WelfareProgram } from '../entities/welfare-program.entity';
import { DEFAULT_PROGRAMS } from '../../common/constants';
import { ProgramCategory } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(WelfareProgram);

  for (const p of DEFAULT_PROGRAMS) {
    const exists = await repo.findOne({ where: { code: p.code } });
    if (!exists) {
      await repo.save(repo.create({
        code: p.code,
        name: p.name,
        category: p.category as ProgramCategory,
        description: p.description,
        maxAmount: p.maxAmount,
      }));
      console.log(`Created welfare program: ${p.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Welfare service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
