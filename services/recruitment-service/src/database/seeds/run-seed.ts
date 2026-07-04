import dataSource from '../data-source';
import { JobPosting } from '../entities/job-posting.entity';
import { DEFAULT_JOB_POSTINGS } from '../../common/constants';
import { EmploymentType, JobPostingStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(JobPosting);

  for (const posting of DEFAULT_JOB_POSTINGS) {
    const exists = await repo.findOne({ where: { referenceNumber: posting.referenceNumber } });
    if (!exists) {
      await repo.save(repo.create({
        referenceNumber: posting.referenceNumber,
        title: posting.title,
        department: posting.department,
        employmentType: posting.employmentType as EmploymentType,
        location: posting.location,
        description: posting.description,
        requirements: [...posting.requirements],
        positionsAvailable: posting.positionsAvailable,
        status: JobPostingStatus.PUBLISHED,
        publishedAt: new Date(),
        closingDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      }));
      console.log(`Created job posting: ${posting.referenceNumber}`);
    }
  }

  await dataSource.destroy();
  console.log('Recruitment service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
