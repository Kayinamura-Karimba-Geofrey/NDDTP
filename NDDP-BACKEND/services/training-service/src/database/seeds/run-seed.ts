import dataSource from '../data-source';
import { TrainingCourse } from '../entities/training-course.entity';
import { DEFAULT_COURSES } from '../../common/constants';
import { CourseCategory, CourseStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(TrainingCourse);

  for (const c of DEFAULT_COURSES) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({
        code: c.code,
        name: c.name,
        category: c.category as CourseCategory,
        description: c.description,
        durationDays: c.durationDays,
        maxParticipants: c.maxParticipants,
        status: CourseStatus.ACTIVE,
      });
      console.log(`Seeded course: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Training seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
