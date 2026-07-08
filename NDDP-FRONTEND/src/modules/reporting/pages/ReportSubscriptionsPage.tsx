import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_SUBSCRIPTIONS, type ReportSubscription } from '../constants/reporting-data';

export function ReportSubscriptionsPage() {
  const columns: DataTableColumn<ReportSubscription>[] = [
    { key: 'report', header: 'Report', render: (r) => <span className="font-medium">{r.report}</span> },
    { key: 'subscriber', header: 'Subscriber', render: (r) => r.subscriber },
    { key: 'freq', header: 'Frequency', render: (r) => r.frequency },
    { key: 'channel', header: 'Channel', render: (r) => r.channel },
    { key: 'next', header: 'Next Delivery', render: (r) => r.nextDelivery },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Subscriptions' }]} title="Report Subscriptions" description="Subscribe to scheduled deliveries — email, DMS, and in-app" actions={<Button onClick={() => toast('Subscribe to report')}><FiPlus className="h-4 w-4" /> Subscribe</Button>} />
      <ReportingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SUBSCRIPTIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
