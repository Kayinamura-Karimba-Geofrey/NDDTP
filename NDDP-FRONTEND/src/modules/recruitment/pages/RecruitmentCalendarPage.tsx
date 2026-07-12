import dayjs from 'dayjs';
import { useGetInterviewsQuery } from '../api/recruitment.api';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { useGetVacanciesQuery, useGetOffersQuery } from '../api/recruitment.api';

export function RecruitmentCalendarPage() {
  const { data: interviews = [] } = useGetInterviewsQuery();
  const { data: vacanciesData } = useGetVacanciesQuery({ limit: 100 });
  const { data: offers = [] } = useGetOffersQuery();

  const vacancies = vacanciesData?.data || [];

  const events = [
    ...interviews.map((i) => ({ date: i.scheduledDate, title: `Interview: ${i.candidateName}`, type: 'Interview' })),
    ...vacancies.filter((v) => v.status === 'OPEN').map((v) => ({ date: v.closingDate, title: `Deadline: ${v.jobTitle}`, type: 'Deadline' })),
    ...offers.filter((o) => o.status === 'SENT').map((o) => ({ date: o.expiryDate, title: `Offer expires: ${o.candidateName}`, type: 'Offer' })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Calendar' }]} title="Recruitment Calendar" description="Interviews, deadlines, offer expiry, and recruitment events" />
      <RecruitmentSubNav />
      <Card>
        <CardContent className="pt-6">
          <ul className="space-y-3">
            {events.map((e, i) => (
              <li key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div>
                  <p className="font-medium">{e.title}</p>
                  <span className="text-xs text-muted-foreground">{e.type}</span>
                </div>
                <time className="text-sm text-muted-foreground">{dayjs(e.date).format('MMM D, YYYY')}</time>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
