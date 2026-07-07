import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { MY_TASKS } from '@/constants/executive-dashboard';
import dayjs from 'dayjs';

export function TaskManagement() {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {MY_TASKS.map((task) => (
          <div key={task.id} className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{task.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{task.module} · Due {dayjs(task.dueDate).format('MMM D')}</p>
              </div>
              <Badge variant={task.priority === 'high' ? 'danger' : 'secondary'}>{task.priority}</Badge>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="capitalize">{task.status.replace('_', ' ')}</span>
                <span>{task.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${task.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
        <Link to="/workflow" className="block text-center text-xs font-medium text-foreground hover:underline">
          View all tasks
        </Link>
      </CardContent>
    </Card>
  );
}
