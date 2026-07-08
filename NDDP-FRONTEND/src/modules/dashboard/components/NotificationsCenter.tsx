import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { DASHBOARD_NOTIFICATIONS } from '@/constants/executive-dashboard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const iconMap = FiIcons as Record<string, React.ComponentType<{ className?: string }>>;

export function NotificationsCenter() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
        <CardTitle className="text-sm">Notifications Center</CardTitle>
        <Link to="/notifications/center" className="text-xs font-medium text-foreground hover:underline">View all</Link>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border/60 p-0">
        {DASHBOARD_NOTIFICATIONS.map((n) => {
          const Icon = iconMap[n.icon] ?? FiIcons.FiBell;
          return (
            <div key={n.id} className={`flex gap-3 px-6 py-4 ${!n.read ? 'bg-muted/30' : ''}`}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <Badge variant={n.priority === 'high' ? 'danger' : n.priority === 'low' ? 'secondary' : 'default'}>
                    {n.priority}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">{dayjs(n.timestamp).fromNow()}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
