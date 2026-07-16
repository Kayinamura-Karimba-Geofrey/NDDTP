import dataSource from '../data-source';
import { AiAgent } from '../entities/ai-agent.entity';
import { DEFAULT_AI_AGENTS } from '../../common/constants';
import { AgentType, AgentStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(AiAgent);

  for (const a of DEFAULT_AI_AGENTS) {
    const exists = await repo.findOne({ where: { code: a.code } });
    if (!exists) {
      await repo.save({
        code: a.code,
        name: a.name,
        agentType: a.agentType as AgentType,
        modelName: a.modelName,
        systemPrompt: a.systemPrompt,
        status: AgentStatus.ACTIVE,
      });
      console.log(`Seeded AI agent: ${a.code}`);
    }
  }

  await dataSource.destroy();
  console.log('AI Assistant seed complete');
}

seed().catch((err) => { console.error(err); process.exit(1); });
