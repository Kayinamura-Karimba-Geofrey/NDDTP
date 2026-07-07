import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ASSIGNMENTS, type AssetAssignment } from '../constants/asset-data';

export function AssetAssignmentPage() {
  const columns: DataTableColumn<AssetAssignment>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Asset' },
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Assigned', render: (r) => dayjs(r.assignmentDate).format('MMM D, YYYY') },
    { key: 'return', header: 'Expected Return', render: (r) => r.expectedReturn ? dayjs(r.expectedReturn).format('MMM D, YYYY') : '—' },
    { key: 'condition', header: 'Condition', render: (r) => r.condition ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Assignment' }]} title="Asset Assignment" description="Assign assets to personnel" actions={<Button onClick={() => toast('Assign asset')}><FiPlus className="h-4 w-4" /> Assign Asset</Button>} />
      <AssetSubNav />
      <Card className="mb-4"><CardContent className="pt-4 text-sm text-muted-foreground">Workflow: Available → Assign → Personnel Accepts → Asset Active</CardContent></Card>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ASSIGNMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
