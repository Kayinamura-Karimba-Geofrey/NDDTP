import { NotificationSubNav } from '../components/NotificationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_HISTORY } from '../constants/notification-data';

export function CommunicationHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'History' }]} title="Communication History" description="Complete communication timeline — sent, delivered, opened, clicked, and completed" />
      <NotificationSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="relative space-y-0">
            {MOCK_HISTORY.map((event, i) => (
              <div key={event.id} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
                  {i < MOCK_HISTORY.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-2">
                  <p className="font-medium">{event.event}</p>
                  <p className="text-sm text-muted-foreground">{event.channel.replace('_', ' ')} → {event.recipient}</p>
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
