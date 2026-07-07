import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_EMERGENCY_CONTACTS, type EmergencyContact } from '../constants/personnel-data';

export function EmergencyContactsPage() {
  const columns: DataTableColumn<EmergencyContact>[] = [
    { key: 'name', header: 'Name', render: (c) => <span className="font-medium">{c.name}</span> },
    { key: 'relationship', header: 'Relationship' },
    { key: 'phone', header: 'Phone' },
    { key: 'address', header: 'Address' },
    { key: 'priority', header: 'Priority', render: (c) => c.priority },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Emergency Contacts' }]} title="Emergency Contacts" actions={<Button onClick={() => toast('Add contact')}><FiPlus className="h-4 w-4" /> Add Contact</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EMERGENCY_CONTACTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}
