import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import {
  SEARCH_DASHBOARD_KPIS,
  QUERIES_BY_DAY,
  INDEX_TYPE_BREAKDOWN,
  QUERY_STATUS_BREAKDOWN,
} from '../constants/search-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6'];

export function SearchDashboardPage() {
  const kpis = [
    { label: 'Active Indexes', value: SEARCH_DASHBOARD_KPIS.activeIndexes },
    { label: 'Indexed Documents', value: SEARCH_DASHBOARD_KPIS.indexedDocuments.toLocaleString() },
    { label: 'Queries Today', value: SEARCH_DASHBOARD_KPIS.queriesToday },
    { label: 'Avg Latency', value: `${SEARCH_DASHBOARD_KPIS.avgLatencyMs} ms` },
    { label: 'Pending Docs', value: SEARCH_DASHBOARD_KPIS.pendingDocuments },
    { label: 'Failed Jobs', value: SEARCH_DASHBOARD_KPIS.failedIndexJobs },
    { label: 'Saved Queries', value: SEARCH_DASHBOARD_KPIS.savedQueries },
    { label: 'My Queries', value: SEARCH_DASHBOARD_KPIS.mineQueries },
    { label: 'Hit Rate', value: SEARCH_DASHBOARD_KPIS.hitRate },
    { label: 'Synonyms', value: SEARCH_DASHBOARD_KPIS.synonyms },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Dashboard' }]} title="Search Platform" description="Indexes, documents, query history, and enterprise search performance" />
      <SearchPlatformSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Documents by Index Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={INDEX_TYPE_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {INDEX_TYPE_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Query Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={QUERY_STATUS_BREAKDOWN}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Weekly Query Volume</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={QUERIES_BY_DAY}>
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
