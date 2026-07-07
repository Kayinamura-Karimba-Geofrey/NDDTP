import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_BENEFITS, type WelfareBenefit } from '../constants/welfare-data';

export function BenefitManagementPage() {
  const columns: DataTableColumn<WelfareBenefit>[] = [
    { key: 'name', header: 'Benefit Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'eligibility', header: 'Eligibility' },
    { key: 'coverage', header: 'Coverage' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'participants', header: 'Participants', render: (r) => r.participants.toLocaleString() },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Benefits' }]} title="Benefit Management" description="Manage employee benefits and eligibility" actions={<Button onClick={() => toast('Add benefit')}><FiPlus className="h-4 w-4" /> Add Benefit</Button>} />
      <WelfareSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_BENEFITS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}
