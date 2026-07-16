import { useGetRecentActivitiesQuery } from '../api/dashboard.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function RecentActivityFeed() {
  const { data: activities } = useGetRecentActivitiesQuery();

  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0 pt-2">
        {activities?.length ? activities.map((a) => (
          <div key={a.id} className="flex gap-4 border-b border-border/60 py-4 last:border-0">
            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {a.module} · {dayjs(a.timestamp).format('MMM D, HH:mm')}
              </p>
            </div>
          </div>
        )) : (
          <p className="py-8 text-center text-sm text-muted-foreground">No recent activity</p>
        )}
      </CardContent>
    </Card>
  );
}
