import dataSource from '../data-source';
import { WorkflowDefinition } from '../entities/workflow-definition.entity';
import { WorkflowStep } from '../entities/workflow-step.entity';
import { DEFAULT_WORKFLOW_DEFINITIONS } from '../../common/constants';
import { WorkflowEntityType, DefinitionStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const defRepo = dataSource.getRepository(WorkflowDefinition);
  const stepRepo = dataSource.getRepository(WorkflowStep);

  for (const d of DEFAULT_WORKFLOW_DEFINITIONS) {
    let definition = await defRepo.findOne({ where: { code: d.code } });
    if (!definition) {
      definition = await defRepo.save({
        code: d.code,
        name: d.name,
        entityType: d.entityType as WorkflowEntityType,
        description: d.description,
        status: DefinitionStatus.ACTIVE,
      });
      console.log(`Seeded workflow definition: ${d.code}`);

      for (const s of d.steps) {
        await stepRepo.save({
          definitionId: definition.id,
          stepOrder: s.stepOrder,
          name: s.name,
          approverRole: s.approverRole,
          isRequired: s.isRequired,
        });
      }
      console.log(`  Seeded ${d.steps.length} steps`);
    }
  }

  await dataSource.destroy();
  console.log('Workflow seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
