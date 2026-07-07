import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetDashboardChartQuery } from '../api/dashboard.api';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const LEAVE_TRENDS = [
  { month: 'Jan', approved: 120, rejected: 8 },
  { month: 'Feb', approved: 98, rejected: 5 },
  { month: 'Mar', approved: 145, rejected: 12 },
  { month: 'Apr', approved: 132, rejected: 7 },
  { month: 'May', approved: 156, rejected: 9 },
  { month: 'Jun', approved: 142, rejected: 6 },
];

const PROCUREMENT_STATUS = [
  { status: 'Pending', count: 47 },
  { status: 'Approved', count: 128 },
  { status: 'Rejected', count: 12 },
  { status: 'In Review', count: 34 },
];

const TRAINING_COMPLETION = [
  { month: 'Jan', rate: 72 },
  { month: 'Feb', rate: 75 },
  { month: 'Mar', rate: 78 },
  { month: 'Apr', rate: 81 },
  { month: 'May', rate: 84 },
  { month: 'Jun', rate: 87 },
];

export function DashboardChartsGrid() {
  const { data: chartData } = useGetDashboardChartQuery();

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Analytics & Trends</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Personnel Growth & Expenditure</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} width={44} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="personnel" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.1} name="Personnel" />
                <Area type="monotone" dataKey="expenditure" stroke={CHART_COLORS.secondary} fill={CHART_COLORS.secondary} fillOpacity={0.1} name="Expenditure (M)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Leave Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={LEAVE_TRENDS} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} width={36} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="approved" fill={CHART_COLORS.primary} name="Approved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejected" fill={CHART_COLORS.secondary} name="Rejected" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Procurement Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PROCUREMENT_STATUS} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="status" tick={chartAxisStyle} axisLine={false} tickLine={false} width={72} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Training Completion Rate (%)</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={TRAINING_COMPLETION} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={chartAxisStyle} axisLine={false} tickLine={false} width={36} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="rate" stroke={CHART_COLORS.primary} strokeWidth={2} dot={{ r: 4 }} name="Completion %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
