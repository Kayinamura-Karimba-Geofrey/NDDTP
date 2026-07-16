import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { MOCK_MY_BENEFITS, MOCK_ASSISTANCE_REQUESTS, MOCK_EVENTS } from '../constants/welfare-data';
import type { AssistanceRequest } from '../constants/welfare-data';

export function MyWelfarePage() {
  const myRequests = MOCK_ASSISTANCE_REQUESTS.filter((r) => r.employeeName === 'Patrick Habimana');

  const columns: DataTableColumn<AssistanceRequest>[] = [
    { key: 'num', header: 'Request #', render: (r) => <code className="text-xs">{r.requestNumber}</code> },
    { key: 'program', header: 'Program' },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('MMM D, YYYY') : '—' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'officer', header: 'Assigned Officer', render: (r) => r.assignedOfficer ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'My Welfare' }]} title="My Welfare" description="Your benefits, requests, events, and wellness activities" actions={<Link to="/welfare/assistance/new"><Button size="sm">New Assistance Request</Button></Link>} />
      <WelfareSubNav />
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold">Active Benefits</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MY_BENEFITS.map((b) => (
            <Card key={b.id}><CardContent className="pt-6">
              <p className="font-medium">{b.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b.coverage}</p>
              <div className="mt-3 flex items-center justify-between"><WelfareStatusBadge status={b.status} />{b.expiryDate && <span className="text-xs text-muted-foreground">Expires {dayjs(b.expiryDate).format('MMM D, YYYY')}</span>}</div>
            </CardContent></Card>
          ))}
        </div>
      </div>
      <Card className="mb-6">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Welfare Requests</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={myRequests as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold">Upcoming Events</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_EVENTS.map((e) => (
            <Card key={e.id}><CardContent className="pt-6">
              <p className="font-medium">{e.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{dayjs(e.date).format('MMM D, YYYY')} · {e.venue}</p>
              <p className="mt-2 text-xs"><WelfareStatusBadge status="ACTIVE" /> <span className="ml-2 text-muted-foreground">{e.registered}/{e.capacity} registered</span></p>
            </CardContent></Card>
          ))}
        </div>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Wellness Activities</CardTitle></CardHeader>
        <CardContent className="pt-4 space-y-3">
          {['30-Day Fitness Challenge — 72% complete', 'Mental Wellness Seminar — Next session Jul 15', 'Nutrition Awareness Campaign — Enrolled'].map((a) => (
            <div key={a} className="rounded-lg border border-border p-3 text-sm">{a}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
