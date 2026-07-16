import dayjs from 'dayjs';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_LEAVE_HISTORY } from '../constants/leave-data';

export function LeaveHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Leave History' }]} title="Leave History" description="Complete audit trail of leave transactions" />
      <LeaveSubNav />
      <Card>
        <CardContent className="pt-6">
          <ol className="relative border-l border-border pl-6">
            {MOCK_LEAVE_HISTORY.map((entry) => (
              <li key={entry.id} className="mb-6 ml-2">
                <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-background bg-primary" />
                <time className="text-xs text-muted-foreground">{dayjs(entry.date).format('MMM D, YYYY HH:mm')}</time>
                <p className="font-medium">{entry.event}</p>
                <p className="text-sm text-muted-foreground">{entry.employeeName} — {entry.description}</p>
                {entry.performedBy && <p className="text-xs text-muted-foreground">By {entry.performedBy}</p>}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
