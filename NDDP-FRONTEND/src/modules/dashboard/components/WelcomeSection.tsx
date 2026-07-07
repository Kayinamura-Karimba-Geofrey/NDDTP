import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { Card, CardContent } from '@/components/ui';
import { MY_TASKS, DASHBOARD_MESSAGES } from '@/constants/executive-dashboard';
import dayjs from 'dayjs';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function WelcomeSection() {
  const user = useAppSelector((s) => s.auth.user);
  const unreadCount = useAppSelector((s) => s.notifications.unreadCount);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest';
  const roleLabel = user?.jobTitle ?? user?.roles?.[0]?.replace(/_/g, ' ') ?? 'User';
  const department = user?.department ?? 'Ministry of Defence';
  const lastLogin =
    sessionStorage.getItem('nddtp_display_last_login') ??
    localStorage.getItem('nddtp_last_login') ??
    new Date(Date.now() - 86_400_000).toISOString();
  const pendingTasks = MY_TASKS.filter((t) => t.status !== 'completed').length;
  const unreadMessages = DASHBOARD_MESSAGES.filter((m) => m.unread).length;

  return (
    <Card className="border-primary/10 bg-gradient-to-r from-card to-muted/30">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{getGreeting()}</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">Welcome back, {fullName}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {roleLabel} · {department}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
            <StatPill label="Last Login" value={dayjs(lastLogin).format('MMM D, HH:mm')} />
            <StatPill label="Date" value={dayjs(now).format('ddd, MMM D')} />
            <StatPill label="Time" value={dayjs(now).format('HH:mm')} />
            <StatPill label="Active Session" value="Online" />
            <StatPill label="Pending Tasks" value={String(pendingTasks)} />
            <StatPill label="Notifications" value={String(unreadCount || 3)} />
            <StatPill label="Messages" value={String(unreadMessages)} />
            <StatPill label="Meetings Today" value="2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
