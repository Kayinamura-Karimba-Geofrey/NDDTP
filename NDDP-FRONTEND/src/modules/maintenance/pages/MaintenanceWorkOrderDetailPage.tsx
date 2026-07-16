import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetWorkOrdersQuery } from '../api/maintenance.api';
import { MOCK_WORK_ORDERS, MOCK_TASKS, type WorkOrderTask } from '../constants/maintenance-data';

export function MaintenanceWorkOrderDetailPage() {
  const { id = 'WO-1201' } = useParams();
  const { data: orders = [] } = useGetWorkOrdersQuery();
  const order = orders.find((o) => o.id === id) ?? MOCK_WORK_ORDERS.find((o) => o.id === id) ?? MOCK_WORK_ORDERS[0];
  const tasks = MOCK_TASKS.filter((t) => t.workOrderId === order.id);

  const columns: DataTableColumn<WorkOrderTask>[] = [
    { key: 'name', header: 'Task', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'assignee', header: 'Assignee', render: (r) => r.assignee },
    { key: 'hours', header: 'Est. Hours', render: (r) => r.estimatedHours },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => toast(`Started ${r.id}`)}>Start</Button>
          <Button size="sm" variant="outline" onClick={() => toast(`Completed ${r.id}`)}>Complete</Button>
          <Button size="sm" variant="outline" onClick={() => toast(`Skipped ${r.id}`)}>Skip</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Maintenance', path: '/maintenance/dashboard' },
          { label: 'Work Orders', path: '/maintenance/work-orders' },
          { label: order.id },
        ]}
        title={order.title}
        description={`${order.type} · ${order.asset} · ${order.priority}`}
        actions={<MaintenanceStatusBadge status={order.status} />}
      />
      <MaintenanceSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Assignee</p><p className="mt-1 font-medium">{order.assignee}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Scheduled</p><p className="mt-1 font-medium">{order.scheduledAt}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Due</p><p className="mt-1 font-medium">{order.dueAt ?? '—'}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Progress</p><p className="mt-1 font-medium">{order.progress}%</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Asset</p><p className="mt-1 font-medium">{order.asset}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Work Order ID</p><p className="mt-1 font-mono text-sm">{order.id}</p></CardContent></Card>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button onClick={() => toast('Work order scheduled')}>Schedule</Button>
        <Button variant="outline" onClick={() => toast('Work order started')}>Start</Button>
        <Button variant="outline" onClick={() => toast('Work order completed')}>Complete</Button>
        <Button variant="outline" onClick={() => toast('Work order cancelled')}>Cancel</Button>
        <Link to="/maintenance/technicians"><Button variant="outline">Technicians</Button></Link>
      </div>
      <Card><CardContent className="pt-6"><h3 className="mb-4 text-sm font-semibold">Tasks</h3><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={tasks as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
