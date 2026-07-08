import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { FleetSubNav } from '../components/FleetSubNav';
import {
  FLEET_DASHBOARD_KPIS,
  FLEET_BY_TYPE,
  VEHICLE_STATUS_BREAKDOWN,
  MONTHLY_FUEL,
  MAINTENANCE_TREND,
  UTILIZATION_BY_DEPT,
} from '../constants/fleet-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function FleetDashboardPage() {
  const kpis = [
    { label: 'Total Vehicles', value: FLEET_DASHBOARD_KPIS.totalVehicles },
    { label: 'Active Vehicles', value: FLEET_DASHBOARD_KPIS.activeVehicles },
    { label: 'Under Maintenance', value: FLEET_DASHBOARD_KPIS.underMaintenance },
    { label: 'Trips Today', value: FLEET_DASHBOARD_KPIS.tripsToday },
    { label: 'Active Trips', value: FLEET_DASHBOARD_KPIS.activeTrips },
    { label: 'Available Drivers', value: FLEET_DASHBOARD_KPIS.availableDrivers },
    { label: 'Fuel (Period)', value: FLEET_DASHBOARD_KPIS.fuelConsumption },
    { label: 'Accident Reports', value: FLEET_DASHBOARD_KPIS.accidentReports },
    { label: 'Inspection Compliance', value: FLEET_DASHBOARD_KPIS.inspectionCompliance },
    { label: 'Utilization Rate', value: FLEET_DASHBOARD_KPIS.utilizationRate },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Dashboard' }]} title="Fleet Dashboard" description="Real-time overview of transportation operations" />
      <FleetSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Fleet by Vehicle Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={FLEET_BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {FLEET_BY_TYPE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Vehicle Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={VEHICLE_STATUS_BREAKDOWN} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} />
                <YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 10 }} width={100} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Fuel Consumption</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_FUEL}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} width={40} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="liters" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Maintenance Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MAINTENANCE_TREND}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="scheduled" fill={CHART_COLORS.primary} />
                <Bar dataKey="completed" fill={CHART_COLORS.secondary} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Fleet Utilization by Department</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={UTILIZATION_BY_DEPT}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={chartAxisStyle} />
              <YAxis tick={chartAxisStyle} width={32} unit="%" />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
