import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { AUDIT_EVENTS } from '@/constants/executive-dashboard';
import dayjs from 'dayjs';

export function AuditSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
        <CardTitle className="text-sm">Audit Summary</CardTitle>
        <Link to="/audit-logs" className="text-xs font-medium text-foreground hover:underline">Full audit log</Link>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border/60 pt-2">
        {AUDIT_EVENTS.map((event) => (
          <div key={event.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{event.action}</p>
              <p className="text-xs text-muted-foreground">{event.user} · {event.module}</p>
            </div>
            <div className="text-right">
              <Badge variant={event.status === 'success' ? 'success' : event.status === 'failed' ? 'danger' : 'warning'}>
                {event.status}
              </Badge>
              <p className="mt-1 text-xs text-muted-foreground">{dayjs(event.timestamp).format('MMM D, HH:mm')}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
