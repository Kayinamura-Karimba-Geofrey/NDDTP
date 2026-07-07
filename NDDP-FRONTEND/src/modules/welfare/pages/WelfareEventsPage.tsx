import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_EVENTS, type WelfareEvent } from '../constants/welfare-data';

export function WelfareEventsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const columns: DataTableColumn<WelfareEvent>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'venue', header: 'Venue' },
    { key: 'organizer', header: 'Organizer' },
    { key: 'capacity', header: 'Capacity', render: (r) => `${r.registered}/${r.capacity}` },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Events' }]} title="Welfare Events" description="Family days, wellness fairs, and community outreach events" actions={<Button onClick={() => toast('Create event')}><FiPlus className="h-4 w-4" /> Create Event</Button>} />
      <WelfareSubNav />
      <div className="mb-4 flex gap-2">
        {(['list', 'calendar'] as const).map((v) => (
          <button key={v} type="button" onClick={() => setView(v)} className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${view === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{v}</button>
        ))}
      </div>
      {view === 'list' ? (
        <Card><CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EVENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent></Card>
      ) : (
        <Card><CardContent className="pt-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_EVENTS.map((e) => (
              <div key={e.id} className="rounded-lg border border-border p-4">
                <p className="font-medium">{e.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{dayjs(e.date).format('dddd, MMM D')}</p>
                <p className="text-xs text-muted-foreground">{e.venue}</p>
              </div>
            ))}
          </div>
        </CardContent></Card>
      )}
    </div>
  );
}
