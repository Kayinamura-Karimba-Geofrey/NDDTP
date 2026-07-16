import dayjs from 'dayjs';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { LeaveStatusBadge } from '../components/LeaveStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { CALENDAR_EVENTS, LEAVE_TYPE_COLORS } from '../constants/leave-data';

export function LeaveCalendarPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Calendar' }]} title="Leave Calendar" description="Approved leave, pending requests, public holidays, and events" />
      <LeaveSubNav />
      <div className="mb-4 flex flex-wrap gap-2">
        {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((v) => <button key={v} type="button" className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">{v}</button>)}
      </div>
      <div className="mb-4 flex flex-wrap gap-3">
        {Object.entries(LEAVE_TYPE_COLORS).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs"><span className="h-3 w-3 rounded" style={{ backgroundColor: color }} />{type}</span>
        ))}
        <span className="flex items-center gap-1.5 text-xs"><span className="h-3 w-3 rounded bg-gray-300" />Pending</span>
      </div>
      <Card>
        <CardContent className="pt-6">
          <ul className="space-y-3">
            {CALENDAR_EVENTS.map((e) => (
              <li key={e.id} className="flex items-center gap-4 border-b border-border pb-3 last:border-0">
                <span className="h-10 w-1 rounded" style={{ backgroundColor: e.color }} />
                <div className="flex-1">
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted-foreground">{dayjs(e.startDate).format('MMM D')}{e.startDate !== e.endDate ? ` – ${dayjs(e.endDate).format('MMM D, YYYY')}` : ''}</p>
                </div>
                {e.leaveType !== 'Public Holiday' && <LeaveStatusBadge status={e.status} />}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
