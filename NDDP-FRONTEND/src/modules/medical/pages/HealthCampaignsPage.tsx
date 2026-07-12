import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetHealthCampaignsQuery } from '../api/medical.api';

export function HealthCampaignsPage() {
  const { data: campaigns = [], isLoading } = useGetHealthCampaignsQuery();

  const totals = campaigns.length > 0 ? {
    participants: campaigns.reduce((s, c) => s + c.participants, 0),
    completion: Math.round(campaigns.reduce((s, c) => s + c.completionRate, 0) / campaigns.length),
    sessions: campaigns.reduce((s, c) => s + c.upcomingSessions, 0),
    feedback: (campaigns.reduce((s, c) => s + c.feedbackScore, 0) / campaigns.length).toFixed(1),
  } : { participants: 0, completion: 0, sessions: 0, feedback: '0.0' };

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
      {isLoading ? (
        <div className="data-table-empty">Loading...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
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
      )}
    </div>
  );
}
