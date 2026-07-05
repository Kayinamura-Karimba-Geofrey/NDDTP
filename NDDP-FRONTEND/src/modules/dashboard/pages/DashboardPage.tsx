import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import * as FiIcons from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  useGetDashboardStatsQuery,
  useGetRecentActivitiesQuery,
  useGetDashboardChartQuery,
} from '../api/dashboard.api';
import { Card, CardContent, CardHeader, CardTitle, Badge, Skeleton, Breadcrumbs } from '@/components/ui';
import { QUICK_ACTIONS } from '@/constants/navigation';
import { formatNumber } from '@/utils/cn';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const iconMap = FiIcons as Record<string, React.ComponentType<{ className?: string }>>;

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: activities } = useGetRecentActivitiesQuery();
  const { data: chartData } = useGetDashboardChartQuery();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: 'Executive Dashboard' }]} />
        <h1 className="mt-2 text-2xl font-bold">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          National Defence Digital Transformation Platform — Real-time administrative overview
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {statsLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28" />)
          : stats?.map((stat) => {
              const Icon = iconMap[stat.icon] ?? FiIcons.FiActivity;
              return (
                <Card key={stat.id}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className={`rounded-lg p-3 text-white ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}</p>
                      {stat.change !== undefined && (
                        <Badge variant={stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'danger' : 'secondary'}>
                          {stat.trend === 'up' ? '+' : ''}{stat.change}%
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personnel & Expenditure Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="personnel" stroke="#00A1DE" fill="#00A1DE33" name="Personnel" />
                <Area yAxisId="right" type="monotone" dataKey="expenditure" stroke="#20603D" fill="#20603D33" name="Expenditure (M RWF)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="flex items-center gap-3 rounded-md border border-border p-3 text-sm hover:bg-muted"
              >
                {action.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {activities?.map((a) => (
              <div key={a.id} className="flex gap-3 border-b border-border pb-3 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {dayjs(a.timestamp).fromNow()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>System Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Auth', status: 100 },
                { name: 'HR', status: 99 },
                { name: 'Finance', status: 98 },
                { name: 'Logistics', status: 100 },
                { name: 'Medical', status: 97 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Bar dataKey="status" fill="#00A1DE" name="Uptime %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
