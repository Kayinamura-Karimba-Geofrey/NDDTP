import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { PENDING_APPROVALS } from '@/constants/executive-dashboard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function PendingApprovals() {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">Pending Approvals</CardTitle>
        <p className="text-xs text-muted-foreground">Items awaiting your action</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {PENDING_APPROVALS.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.module} · {item.requester} · {dayjs(item.submittedAt).fromNow()}
                </p>
              </div>
              <Badge variant={item.priority === 'high' ? 'danger' : item.priority === 'low' ? 'secondary' : 'default'}>
                {item.priority}
              </Badge>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="primary">Approve</Button>
              <Button size="sm" variant="outline">Reject</Button>
              <Button size="sm" variant="ghost">Details</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
