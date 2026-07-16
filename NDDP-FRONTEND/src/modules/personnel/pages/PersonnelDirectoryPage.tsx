import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus, FiSearch, FiDownload, FiPrinter } from 'react-icons/fi';
import { useGetPersonnelQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PersonnelStatusBadge } from '../components/PersonnelStatusBadge';
import { Avatar } from '@/components/ui';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { PersonnelRecord } from '../constants/personnel-data';

export function PersonnelDirectoryPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetPersonnelQuery({ page: 1, limit: 50, search: search || undefined, serviceStatus: statusFilter || undefined });

  const columns: DataTableColumn<PersonnelRecord>[] = [
    {
      key: 'name',
      header: 'Full Name',
      render: (p) => (
        <div className="flex items-center gap-2">
          <Avatar name={`${p.firstName} ${p.lastName}`} src={p.profilePhotoUrl} size="sm" />
          <span className="font-medium">{p.firstName} {p.lastName}</span>
        </div>
      ),
    },
    { key: 'serviceNumber', header: 'Personnel #', render: (p) => <code className="text-xs">{p.serviceNumber}</code> },
    { key: 'department', header: 'Department' },
    { key: 'unit', header: 'Unit' },
    { key: 'position', header: 'Position' },
    { key: 'type', header: 'Employment Type', render: (p) => p.employmentType },
    { key: 'status', header: 'Status', render: (p) => <PersonnelStatusBadge status={p.serviceStatus} /> },
    { key: 'supervisor', header: 'Supervisor', render: (p) => p.supervisor ?? '—' },
    { key: 'location', header: 'Work Location', render: (p) => p.workLocation },
    { key: 'phone', header: 'Phone', render: (p) => p.phone ?? '—' },
    { key: 'email', header: 'Email' },
    { key: 'hire', header: 'Hire Date', render: (p) => dayjs(p.hireDate).format('MMM D, YYYY') },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          <Link to={`/personnel/${p.id}`}><Button variant="ghost" size="sm">View</Button></Link>
          <Link to={`/personnel/${p.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
          <Link to="/personnel/transfers"><Button variant="ghost" size="sm">Transfer</Button></Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Directory' }]}
        title="Personnel Directory"
        description="Master list of all personnel records"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast('Exporting...')}><FiDownload className="h-4 w-4" /> Export</Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}><FiPrinter className="h-4 w-4" /> Print</Button>
            <Link to="/personnel/new"><Button><FiPlus className="h-4 w-4" /> Register Personnel</Button></Link>
          </div>
        }
      />
      <PersonnelSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative min-w-[200px] flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search by name, personnel #, email..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {['', 'ACTIVE', 'ON_LEAVE', 'IN_TRAINING', 'SUSPENDED'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace('_', ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading personnel...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
