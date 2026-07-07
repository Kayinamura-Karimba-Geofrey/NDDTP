import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ORG_CHART_DATA } from '@/constants/executive-dashboard';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#94a3b8', '#cbd5e1', '#e2e8f0', '#64748b'];

export function OrganizationOverview() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Organization Overview</h2>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Personnel by Department</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ORG_CHART_DATA.personnelByDept} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} width={40} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Assets by Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={ORG_CHART_DATA.assetsByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {ORG_CHART_DATA.assetsByCategory.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Budget Allocation vs Used (B RWF)</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ORG_CHART_DATA.budgetByDept} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} width={32} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="allocated" fill={CHART_COLORS.secondary} name="Allocated" radius={[4, 4, 0, 0]} maxBarSize={20} />
                <Bar dataKey="used" fill={CHART_COLORS.primary} name="Used" radius={[4, 4, 0, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
