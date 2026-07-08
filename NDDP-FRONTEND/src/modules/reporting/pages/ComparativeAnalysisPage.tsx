import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { COMPARATIVE_SERIES } from '../constants/reporting-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

export function ComparativeAnalysisPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Comparative' }]} title="Comparative Analysis" description="Compare department vs department, year vs year, quarter vs quarter, branch, and program performance" />
      <ReportingSubNav />
      <Card className="mb-6">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Department Score — This Year vs Last Year</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={COMPARATIVE_SERIES}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} domain={[0, 100]} />
              <Tooltip {...chartTooltipStyle} /><Legend />
              <Bar dataKey="thisYear" name="This Year" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey="lastYear" name="Last Year" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Dept vs Dept', 'Year vs Year', 'Quarter vs Quarter', 'Branch vs Branch'].map((label) => (
          <Card key={label}><CardContent className="pt-6"><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-muted-foreground">Comparative view available</p></CardContent></Card>
        ))}
      </div>
    </div>
  );
}
