import { useState } from 'react';
import dayjs from 'dayjs';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_APPOINTMENTS, MOCK_CAMPAIGNS } from '../constants/medical-data';

export function MedicalCalendarPage() {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const events = [
    ...MOCK_APPOINTMENTS.map((a) => ({ date: a.date, title: `${a.appointmentType} — ${a.personnelName}`, type: 'Appointment' })),
    ...MOCK_CAMPAIGNS.map((c) => ({ date: '2026-07-15', title: c.name, type: 'Campaign' })),
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Calendar' }]} title="Medical Calendar" description="Appointments, assessments, campaigns, and follow-ups" />
      <MedicalSubNav />
      <div className="mb-4 flex gap-2">
        {(['daily', 'weekly', 'monthly'] as const).map((v) => (
          <button key={v} type="button" onClick={() => setView(v)} className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${view === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{v}</button>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground">{e.type}</p>
                <p className="font-medium">{e.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{dayjs(e.date).format('dddd, MMM D, YYYY')}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
