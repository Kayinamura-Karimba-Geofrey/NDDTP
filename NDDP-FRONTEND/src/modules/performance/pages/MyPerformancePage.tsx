import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetMyGoalsQuery, useGetPerformanceReviewsQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_FEEDBACK, MOCK_RECOGNITION, MOCK_IDPS } from '../constants/performance-data';

export function MyPerformancePage() {
  const { data: goals = [] } = useGetMyGoalsQuery();
  const { data: reviewsData } = useGetPerformanceReviewsQuery({ page: 1, limit: 5 });
  const currentReview = reviewsData?.data?.[0];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'My Performance' }]} title="My Performance" description="Your goals, feedback, recognition, and development" />
      <PerformanceSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Current Rating</p><p className="text-2xl font-bold">{currentReview?.overallRating?.replace(/_/g, ' ') ?? 'Pending'}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Review Cycle</p><p className="text-lg font-bold">{currentReview?.cycle ?? '2026 Annual'}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Active Objectives</p><p className="text-2xl font-bold">{goals.filter((g) => g.status === 'ACTIVE' || g.status === 'ON_TRACK').length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Dev Plan</p><p className="text-lg font-bold">{MOCK_IDPS[0]?.status.replace(/_/g, ' ')}</p></CardContent></Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">My Goals</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4">
            {goals.map((g) => (
              <div key={g.id} className="rounded-lg border border-border p-3">
                <div className="mb-1 flex items-center justify-between"><p className="font-medium">{g.title}</p><PerformanceStatusBadge status={g.status} /></div>
                <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${g.progressPercent}%` }} /></div>
                <p className="text-xs text-muted-foreground">{g.progressPercent}% · Due {g.dueDate ? dayjs(g.dueDate).format('DD MMM YYYY') : '—'}</p>
              </div>
            ))}
            <Link to="/performance/objectives" className="text-sm underline">View all objectives</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent Feedback</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4">
            {MOCK_FEEDBACK.map((f) => (
              <div key={f.id} className="rounded-lg border border-border p-3 text-sm">
                <p className="font-medium">{f.type} — from {f.from}</p>
                <p className="text-muted-foreground">{f.message}</p>
                <p className="mt-1 text-xs">{dayjs(f.date).format('DD MMM YYYY')} · {f.acknowledged ? 'Acknowledged' : 'Pending acknowledgement'}</p>
              </div>
            ))}
            <Link to="/performance/feedback" className="text-sm underline">View feedback timeline</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recognition</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4">
            {MOCK_RECOGNITION.map((a) => (<div key={a.id} className="text-sm"><p className="font-medium">{a.award}</p><p className="text-muted-foreground">{a.reason} · {dayjs(a.date).format('MMM YYYY')}</p></div>))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Development Plan</CardTitle></CardHeader>
          <CardContent className="pt-4 text-sm">
            <p className="font-medium">{MOCK_IDPS[0]?.careerGoals}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${MOCK_IDPS[0]?.progress ?? 0}%` }} /></div>
            <p className="mt-1 text-xs text-muted-foreground">{MOCK_IDPS[0]?.progress}% complete · <Link to="/training/my-learning" className="underline">Training recommendations</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
