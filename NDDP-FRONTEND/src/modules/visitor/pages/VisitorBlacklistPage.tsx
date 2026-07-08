import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_BLACKLIST, type BlacklistEntry } from '../constants/visitor-data';

export function VisitorBlacklistPage() {
  const columns: DataTableColumn<BlacklistEntry>[] = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'reason', header: 'Reason', render: (r) => r.reason },
    { key: 'by', header: 'Added By', render: (r) => r.addedBy },
    { key: 'at', header: 'Added At', render: (r) => r.addedAt },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Review requested')}>Review</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Blacklist' }]} title="Blacklist" description="Restricted individuals barred from site access — security-controlled" actions={<Button onClick={() => toast('Add to blacklist')}><FiPlus className="h-4 w-4" /> Add Entry</Button>} />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_BLACKLIST as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
