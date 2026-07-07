import { useGetPersonnelQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PersonnelStatusBadge } from '../components/PersonnelStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import type { PersonnelRecord } from '../constants/personnel-data';

export function EmploymentStatusPage() {
  const { data, isLoading } = useGetPersonnelQuery({ page: 1, limit: 50 });

  const columns: DataTableColumn<PersonnelRecord>[] = [
    { key: 'name', header: 'Personnel', render: (p) => `${p.firstName} ${p.lastName}` },
    { key: 'number', header: 'Personnel #', render: (p) => <code className="text-xs">{p.serviceNumber}</code> },
    { key: 'department', header: 'Department' },
    { key: 'type', header: 'Employment Type', render: (p) => p.employmentType },
    { key: 'status', header: 'Status', render: (p) => <PersonnelStatusBadge status={p.serviceStatus} /> },
    { key: 'contract', header: 'Contract End', render: (p) => p.contractEndDate ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Employment Status' }]} title="Employment Status" description="Manage personnel lifecycle — Active, On Leave, In Training, Suspended, Retired, Separated" />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}
