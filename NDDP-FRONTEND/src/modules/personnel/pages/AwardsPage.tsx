import dayjs from 'dayjs';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_AWARDS, type AwardRecord } from '../constants/personnel-data';

export function AwardsPage() {
  const columns: DataTableColumn<AwardRecord>[] = [
    { key: 'person', header: 'Personnel', render: (a) => <span className="font-medium">{a.personnelName}</span> },
    { key: 'title', header: 'Title' },
    { key: 'type', header: 'Type' },
    { key: 'date', header: 'Date', render: (a) => dayjs(a.date).format('MMM D, YYYY') },
    { key: 'issued', header: 'Issued By', render: (a) => a.issuedBy },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Awards & Recognition' }]} title="Awards & Recognition" description="Awards, recognition, certificates, and commendations" />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_AWARDS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}
