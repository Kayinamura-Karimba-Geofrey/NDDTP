import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_WELLNESS } from '../constants/welfare-data';

export function WellnessProgramsPage() {
  const totals = {
    participants: MOCK_WELLNESS.reduce((s, w) => s + w.participants, 0),
    completionRate: Math.round(MOCK_WELLNESS.reduce((s, w) => s + w.completionRate, 0) / MOCK_WELLNESS.length),
    upcomingSessions: MOCK_WELLNESS.reduce((s, w) => s + w.upcomingSessions, 0),
    feedbackScore: (MOCK_WELLNESS.reduce((s, w) => s + w.feedbackScore, 0) / MOCK_WELLNESS.length).toFixed(1),
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Wellness' }]} title="Wellness Programs" description="Fitness challenges, health campaigns, and mental wellness initiatives" />
      <WelfareSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Participants', value: totals.participants },
          { label: 'Completion Rate', value: `${totals.completionRate}%` },
          { label: 'Upcoming Sessions', value: totals.upcomingSessions },
          { label: 'Feedback Score', value: `${totals.feedbackScore}/5` },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_WELLNESS.map((w) => (
          <Card key={w.id}>
            <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">{w.name}</CardTitle></CardHeader>
            <CardContent className="pt-4 space-y-2 text-sm">
              <p>Participants: {w.participants}</p>
              <p>Completion: {w.completionRate}%</p>
              <p>Upcoming sessions: {w.upcomingSessions}</p>
              <p>Feedback: {w.feedbackScore}/5</p>
              <WelfareStatusBadge status={w.status} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
