import dataSource from '../data-source';
import { Calendar } from '../entities/calendar.entity';
import { DEFAULT_CALENDARS } from '../../common/constants';
import { CalendarType, CalendarStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Calendar);

  for (const c of DEFAULT_CALENDARS) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({
        code: c.code,
        name: c.name,
        calendarType: c.calendarType as CalendarType,
        status: CalendarStatus.ACTIVE,
      });
      console.log(`Seeded calendar: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Calendar seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
