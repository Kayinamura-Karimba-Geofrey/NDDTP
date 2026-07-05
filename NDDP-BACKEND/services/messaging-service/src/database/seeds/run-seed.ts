import dataSource from '../data-source';
import { MessageChannel } from '../entities/message-channel.entity';
import { DEFAULT_CHANNELS } from '../../common/constants';
import { ChannelType, ChannelStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(MessageChannel);

  for (const c of DEFAULT_CHANNELS) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({
        code: c.code,
        name: c.name,
        channelType: c.channelType as ChannelType,
        createdBy: '00000000-0000-0000-0000-000000000001',
        status: ChannelStatus.ACTIVE,
      });
      console.log(`Seeded channel: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Messaging seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
