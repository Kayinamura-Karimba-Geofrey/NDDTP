import dayjs from 'dayjs';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { useGetTalentPoolQuery } from '../api/recruitment.api';

export function TalentPoolPage() {
  const { data: talentPool = [], isLoading } = useGetTalentPoolQuery();
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Talent Pool' }]} title="Talent Pool" description="Database of previous candidates for future opportunities" />
      <RecruitmentSubNav />
      <div className="mb-4 flex flex-wrap gap-2">
        {['Ready for Hire', 'Future Opportunities', 'Internships', 'Experienced Professionals', 'Graduate Candidates'].map((cat) => (
          <span key={cat} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{cat}</span>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? <div className="col-span-full p-8 text-center text-muted-foreground">Loading talent pool...</div> : talentPool.map((c) => (
          <Card key={c.id}>
            <CardContent className="pt-6">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.email}</p>
              <p className="mt-1 text-xs text-primary">{c.category}</p>
              <div className="mt-2 flex flex-wrap gap-1">{c.skills.map((s) => <span key={s} className="rounded bg-muted px-2 py-0.5 text-xs">{s}</span>)}</div>
              <p className="mt-2 text-xs text-muted-foreground">Last contact: {dayjs(c.lastContact).format('MMM D, YYYY')}</p>
              {c.notes && <p className="mt-1 text-xs italic text-muted-foreground">{c.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
