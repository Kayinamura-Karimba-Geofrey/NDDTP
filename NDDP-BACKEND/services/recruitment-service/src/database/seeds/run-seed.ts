import dataSource from '../data-source';
import { JobPosting } from '../entities/job-posting.entity';
import { Candidate } from '../entities/candidate.entity';
import { Application } from '../entities/application.entity';
import { Interview } from '../entities/interview.entity';
import { DEFAULT_JOB_POSTINGS } from '../../common/constants';
import { EmploymentType, JobPostingStatus, ApplicationStatus, InterviewType, InterviewStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  
  const postingRepo = dataSource.getRepository(JobPosting);
  const candidateRepo = dataSource.getRepository(Candidate);
  const applicationRepo = dataSource.getRepository(Application);
  const interviewRepo = dataSource.getRepository(Interview);

  const postings: JobPosting[] = [];
  for (const posting of DEFAULT_JOB_POSTINGS) {
    let exists = await postingRepo.findOne({ where: { referenceNumber: posting.referenceNumber } });
    if (!exists) {
      exists = await postingRepo.save(postingRepo.create({
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
    postings.push(exists);
  }

  // Seed Candidates
  const candidatesData = [
    { firstName: 'Eric', lastName: 'Niyonsenga', email: 'eric.n@email.com', phone: '+250 788 400 001' },
    { firstName: 'Claire', lastName: 'Mutesi', email: 'claire.m@email.com', phone: '+250 788 400 002' },
    { firstName: 'Fabrice', lastName: 'Nkurunziza', email: 'fabrice.n@email.com', phone: '+250 788 400 003' },
  ];

  const candidates: Candidate[] = [];
  for (const c of candidatesData) {
    let candidate = await candidateRepo.findOne({ where: { email: c.email } });
    if (!candidate) {
      candidate = await candidateRepo.save(candidateRepo.create(c));
      console.log(`Created candidate: ${c.email}`);
    }
    candidates.push(candidate);
  }

  // Seed Applications
  const appsData = [
    { candidate: candidates[0], posting: postings[0], status: ApplicationStatus.INTERVIEW },
    { candidate: candidates[1], posting: postings[1], status: ApplicationStatus.SCREENING },
    { candidate: candidates[2], posting: postings[0], status: ApplicationStatus.SUBMITTED },
  ];

  for (let i = 0; i < appsData.length; i++) {
    const data = appsData[i];
    const appNum = `APP-2026-${String(i + 1).padStart(4, '0')}`;
    let app = await applicationRepo.findOne({ where: { applicationNumber: appNum } });
    if (!app) {
      app = await applicationRepo.save(applicationRepo.create({
        applicationNumber: appNum,
        candidateId: data.candidate.id,
        jobPostingId: data.posting.id,
        status: data.status,
        submittedAt: new Date(),
      }));
      console.log(`Created application: ${appNum}`);
      
      // Seed Interviews if status is INTERVIEW
      if (data.status === ApplicationStatus.INTERVIEW) {
        await interviewRepo.save(interviewRepo.create({
          applicationId: app.id,
          type: InterviewType.IN_PERSON,
          status: InterviewStatus.SCHEDULED,
          scheduledAt: new Date(Date.now() + 7 * 86400000), // 7 days from now
          durationMinutes: 60,
          location: 'Kigali HQ - Room 204',
          interviewerIds: [],
        }));
        console.log(`Scheduled interview for ${appNum}`);
      }
    }
  }

  await dataSource.destroy();
  console.log('Recruitment service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
