import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { DASHBOARD_MESSAGES } from '@/constants/executive-dashboard';

export function MessagesWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
        <CardTitle className="text-sm">Messages</CardTitle>
        <Link to="/messaging/inbox" className="text-xs font-medium text-foreground hover:underline">View all</Link>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border/60 pt-2">
        {DASHBOARD_MESSAGES.map((msg) => (
          <div key={msg.id} className={`px-2 py-3 ${msg.unread ? 'bg-muted/30' : ''}`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm ${msg.unread ? 'font-semibold text-foreground' : 'text-foreground'}`}>{msg.from}</p>
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{msg.preview}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
