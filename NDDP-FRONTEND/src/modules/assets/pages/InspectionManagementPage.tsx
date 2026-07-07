import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_INSPECTIONS, type InspectionRecord } from '../constants/asset-data';

export function InspectionManagementPage() {
  const columns: DataTableColumn<InspectionRecord>[] = [
    { key: 'asset', header: 'Asset', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Name' },
    { key: 'date', header: 'Inspection Date', render: (r) => dayjs(r.inspectionDate).format('MMM D, YYYY') },
    { key: 'inspector', header: 'Inspector' },
    { key: 'condition', header: 'Condition' },
    { key: 'compliance', header: 'Compliance' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Inspections' }]} title="Inspection Management" description="Routine asset inspections and compliance" actions={<Button onClick={() => toast('Schedule inspection')}><FiPlus className="h-4 w-4" /> Schedule</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INSPECTIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}
