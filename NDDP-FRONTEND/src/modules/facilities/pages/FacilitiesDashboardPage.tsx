import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import {
  FACILITIES_DASHBOARD_KPIS,
  FACILITIES_BY_TYPE,
  SPACE_STATUS_BREAKDOWN,
  WEEKLY_BOOKINGS,
} from '../constants/facilities-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function FacilitiesDashboardPage() {
  const kpis = [
    { label: 'Total Facilities', value: FACILITIES_DASHBOARD_KPIS.totalFacilities },
    { label: 'Active', value: FACILITIES_DASHBOARD_KPIS.activeFacilities },
    { label: 'Spaces Available', value: FACILITIES_DASHBOARD_KPIS.spacesAvailable },
    { label: 'Spaces Occupied', value: FACILITIES_DASHBOARD_KPIS.spacesOccupied },
    { label: 'Pending Bookings', value: FACILITIES_DASHBOARD_KPIS.pendingBookings },
    { label: 'Bookings Today', value: FACILITIES_DASHBOARD_KPIS.bookingsToday },
    { label: 'Under Renovation', value: FACILITIES_DASHBOARD_KPIS.underRenovation },
    { label: 'Avg Occupancy', value: FACILITIES_DASHBOARD_KPIS.avgOccupancy },
    { label: 'Utility Alerts', value: FACILITIES_DASHBOARD_KPIS.utilityAlerts },
    { label: 'Inspections Due', value: FACILITIES_DASHBOARD_KPIS.inspectionsDue },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Dashboard' }]} title="Facilities Dashboard" description="Buildings, spaces, bookings, occupancy, utilities, and access control" />
      <FacilitiesSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Facilities by Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={FACILITIES_BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {FACILITIES_BY_TYPE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Space Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={SPACE_STATUS_BREAKDOWN}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Weekly Bookings</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_BOOKINGS}>
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
