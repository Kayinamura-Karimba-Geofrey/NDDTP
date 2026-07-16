import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { GEO_REGIONS } from '../constants/reporting-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

export function GeographicAnalyticsPage() {
  const columns: DataTableColumn<(typeof GEO_REGIONS)[number]>[] = [
    { key: 'region', header: 'Region', render: (r) => <span className="font-medium">{r.region}</span> },
    { key: 'personnel', header: 'Personnel', render: (r) => r.personnel.toLocaleString() },
    { key: 'facilities', header: 'Facilities', render: (r) => r.facilities },
    { key: 'incidents', header: 'Incidents', render: (r) => r.incidents },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Geographic' }]} title="Geographic Analytics" description="Regional personnel distribution, facilities, performance, and incidents" />
      <ReportingSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Personnel by Region</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={GEO_REGIONS}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="region" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={40} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="personnel" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex h-[240px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
              Interactive map placeholder — personnel, facilities, and incident overlays
            </div>
          </CardContent>
        </Card>
      </div>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={GEO_REGIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.region)} /></CardContent></Card>
    </div>
  );
}
