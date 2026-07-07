import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { CALENDAR_EVENTS } from '@/constants/executive-dashboard';

const TYPE_COLORS: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-800',
  training: 'bg-green-100 text-green-800',
  leave: 'bg-amber-100 text-amber-800',
  maintenance: 'bg-purple-100 text-purple-800',
  holiday: 'bg-red-100 text-red-800',
};

export function CalendarWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
        <CardTitle className="text-sm">Today&apos;s Schedule</CardTitle>
        <Link to="/calendar" className="text-xs font-medium text-foreground hover:underline">Open calendar</Link>
      </CardHeader>
      <CardContent className="space-y-2 pt-4">
        {CALENDAR_EVENTS.map((event) => (
          <div key={event.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
            <span className="w-14 shrink-0 text-xs font-medium text-muted-foreground">{event.time}</span>
            <span className="flex-1 text-sm text-foreground">{event.title}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${TYPE_COLORS[event.type]}`}>
              {event.type}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
