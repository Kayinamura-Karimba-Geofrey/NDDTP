import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { NotificationSubNav } from '../components/NotificationSubNav';
import {
  NOTIFICATION_DASHBOARD_KPIS,
  NOTIFICATIONS_BY_CHANNEL,
  DAILY_NOTIFICATION_VOLUME,
  DELIVERY_STATUS_BREAKDOWN,
  NOTIFICATIONS_BY_SERVICE,
} from '../constants/notification-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#8b5cf6'];

export function NotificationDashboardPage() {
  const kpis = [
    { label: 'Sent Today', value: NOTIFICATION_DASHBOARD_KPIS.sentToday },
    { label: 'Emails Sent', value: NOTIFICATION_DASHBOARD_KPIS.emailsSent },
    { label: 'SMS Sent', value: NOTIFICATION_DASHBOARD_KPIS.smsSent },
    { label: 'Push Sent', value: NOTIFICATION_DASHBOARD_KPIS.pushSent },
    { label: 'In-App Sent', value: NOTIFICATION_DASHBOARD_KPIS.inAppSent },
    { label: 'Failed Deliveries', value: NOTIFICATION_DASHBOARD_KPIS.failedDeliveries },
    { label: 'Pending', value: NOTIFICATION_DASHBOARD_KPIS.pending },
    { label: 'Scheduled', value: NOTIFICATION_DASHBOARD_KPIS.scheduled },
    { label: 'Avg Delivery Time', value: NOTIFICATION_DASHBOARD_KPIS.avgDeliveryTime },
    { label: 'Success Rate', value: NOTIFICATION_DASHBOARD_KPIS.successRate },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Dashboard' }]} title="Notification Dashboard" description="Operational visibility for all system communications" />
      <NotificationSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Notifications by Channel</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={NOTIFICATIONS_BY_CHANNEL} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {NOTIFICATIONS_BY_CHANNEL.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Delivery Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={DELIVERY_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {DELIVERY_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Daily Notification Volume</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={DAILY_NOTIFICATION_VOLUME}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={40} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Notifications by Service</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={NOTIFICATIONS_BY_SERVICE} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} />
                <YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={80} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
