import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { InventorySubNav } from '../components/InventorySubNav';
import {
  INVENTORY_DASHBOARD_KPIS,
  INVENTORY_BY_CATEGORY,
  WAREHOUSE_STOCK_DISTRIBUTION,
  MONTHLY_STOCK_MOVEMENT,
  LOW_STOCK_TREND,
  EXPIRY_TIMELINE,
} from '../constants/inventory-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#94a3b8', '#64748b', '#22c55e', '#8b5cf6', '#ec4899'];

export function InventoryDashboardPage() {
  const kpis = [
    { label: 'Total Items', value: INVENTORY_DASHBOARD_KPIS.totalItems.toLocaleString() },
    { label: 'Warehouses', value: INVENTORY_DASHBOARD_KPIS.totalWarehouses },
    { label: 'Available Stock', value: INVENTORY_DASHBOARD_KPIS.availableStock.toLocaleString() },
    { label: 'Low Stock', value: INVENTORY_DASHBOARD_KPIS.lowStockItems },
    { label: 'Out of Stock', value: INVENTORY_DASHBOARD_KPIS.outOfStockItems },
    { label: 'Expiring Soon', value: INVENTORY_DASHBOARD_KPIS.expiringSoon },
    { label: 'Pending Requests', value: INVENTORY_DASHBOARD_KPIS.pendingRequests },
    { label: 'Received Today', value: INVENTORY_DASHBOARD_KPIS.receivedToday.toLocaleString() },
    { label: 'Issued Today', value: INVENTORY_DASHBOARD_KPIS.issuedToday.toLocaleString() },
    { label: 'Pending Transfers', value: INVENTORY_DASHBOARD_KPIS.pendingTransfers },
    { label: 'Inventory Value', value: `${(INVENTORY_DASHBOARD_KPIS.inventoryValue / 1e9).toFixed(2)}B RWF` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Dashboard' }]} title="Inventory Dashboard" description="Real-time overview of stock availability and warehouse operations" />
      <InventorySubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Inventory by Category</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={INVENTORY_BY_CATEGORY} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={100} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Warehouse Stock Distribution</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={WAREHOUSE_STOCK_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{WAREHOUSE_STOCK_DISTRIBUTION.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Stock Movement</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MONTHLY_STOCK_MOVEMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="received" fill={CHART_COLORS.primary} stackId="a" /><Bar dataKey="issued" fill={CHART_COLORS.secondary} stackId="a" /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Low Stock Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={LOW_STOCK_TREND}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={28} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Expiry Timeline</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={EXPIRY_TIMELINE}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={28} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
