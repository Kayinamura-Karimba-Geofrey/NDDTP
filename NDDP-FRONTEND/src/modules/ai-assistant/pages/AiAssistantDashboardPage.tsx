import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import {
  AI_DASHBOARD_KPIS,
  MESSAGES_BY_DAY,
  AGENTS_BY_TYPE,
  CONVERSATION_STATUS,
} from '../constants/ai-assistant-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444'];

export function AiAssistantDashboardPage() {
  const kpis = [
    { label: 'Active Agents', value: AI_DASHBOARD_KPIS.activeAgents },
    { label: 'Active Chats', value: AI_DASHBOARD_KPIS.activeConversations },
    { label: 'Closed Today', value: AI_DASHBOARD_KPIS.closedToday },
    { label: 'Messages Today', value: AI_DASHBOARD_KPIS.messagesToday },
    { label: 'Avg Tokens', value: AI_DASHBOARD_KPIS.avgTokens },
    { label: 'Pending Replies', value: AI_DASHBOARD_KPIS.pendingReplies },
    { label: 'Failed Messages', value: AI_DASHBOARD_KPIS.failedMessages },
    { label: 'Archived', value: AI_DASHBOARD_KPIS.archived },
    { label: 'Satisfaction', value: AI_DASHBOARD_KPIS.satisfaction },
    { label: 'Avg Latency', value: `${AI_DASHBOARD_KPIS.avgLatencyMs} ms` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Dashboard' }]} title="AI Assistant" description="Agents, conversations, messaging throughput, and assistant health" />
      <AiAssistantSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Agents by Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={AGENTS_BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {AGENTS_BY_TYPE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Conversation Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={CONVERSATION_STATUS}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Weekly Message Volume</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MESSAGES_BY_DAY}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="day" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} />
              <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.secondary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
