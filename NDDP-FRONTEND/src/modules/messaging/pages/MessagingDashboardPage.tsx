import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MessagingSubNav } from '../components/MessagingSubNav';
import {
  MESSAGING_DASHBOARD_KPIS,
  MESSAGES_BY_TYPE,
  DAILY_MESSAGE_VOLUME,
  DELIVERY_STATUS,
} from '../constants/messaging-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#8b5cf6'];

export function MessagingDashboardPage() {
  const kpis = [
    { label: 'My Channels', value: MESSAGING_DASHBOARD_KPIS.myChannels },
    { label: 'Unread Messages', value: MESSAGING_DASHBOARD_KPIS.unreadMessages },
    { label: 'Direct Chats', value: MESSAGING_DASHBOARD_KPIS.directChats },
    { label: 'Group Channels', value: MESSAGING_DASHBOARD_KPIS.groupChannels },
    { label: 'Department Channels', value: MESSAGING_DASHBOARD_KPIS.departmentChannels },
    { label: 'Broadcasts', value: MESSAGING_DASHBOARD_KPIS.broadcasts },
    { label: 'Messages Today', value: MESSAGING_DASHBOARD_KPIS.messagesToday },
    { label: 'Active Members', value: MESSAGING_DASHBOARD_KPIS.activeMembers },
    { label: 'Delivery Rate', value: MESSAGING_DASHBOARD_KPIS.deliveryRate },
    { label: 'Avg Response Time', value: MESSAGING_DASHBOARD_KPIS.avgResponseTime },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Dashboard' }]} title="Messaging Dashboard" description="Channels, conversations, delivery, and presence across the organization" />
      <MessagingSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Messages by Channel Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={MESSAGES_BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {MESSAGES_BY_TYPE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
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
                <Pie data={DELIVERY_STATUS} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {DELIVERY_STATUS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Daily Message Volume</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={DAILY_MESSAGE_VOLUME}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={36} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Channel Mix</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MESSAGES_BY_TYPE}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
