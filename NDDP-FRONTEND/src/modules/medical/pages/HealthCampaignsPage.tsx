import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_CAMPAIGNS } from '../constants/medical-data';

export function HealthCampaignsPage() {
  const totals = {
    participants: MOCK_CAMPAIGNS.reduce((s, c) => s + c.participants, 0),
    completion: Math.round(MOCK_CAMPAIGNS.reduce((s, c) => s + c.completionRate, 0) / MOCK_CAMPAIGNS.length),
    sessions: MOCK_CAMPAIGNS.reduce((s, c) => s + c.upcomingSessions, 0),
    feedback: (MOCK_CAMPAIGNS.reduce((s, c) => s + c.feedbackScore, 0) / MOCK_CAMPAIGNS.length).toFixed(1),
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Health Campaigns' }]} title="Health Campaigns" description="Medical screening, vaccination, and awareness initiatives" />
      <MedicalSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Participants', value: totals.participants },
          { label: 'Avg Completion', value: `${totals.completion}%` },
          { label: 'Upcoming Sessions', value: totals.sessions },
          { label: 'Feedback Score', value: `${totals.feedback}/5` },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CAMPAIGNS.map((c) => (
          <Card key={c.id}>
            <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">{c.name}</CardTitle></CardHeader>
            <CardContent className="space-y-2 pt-4 text-sm">
              <p>Participants: {c.participants}</p>
              <p>Completion: {c.completionRate}%</p>
              <p>Upcoming sessions: {c.upcomingSessions}</p>
              <p>Feedback: {c.feedbackScore}/5</p>
              <MedicalStatusBadge status={c.status} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
