import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetCheckInLogsQuery } from '../api/visitor.api';
import type { CheckInLog } from '../constants/visitor-data';
import { CheckInVisitorModal } from '../components/CheckInVisitorModal';

export function VisitorCheckInPage() {
  const { data: logs = [], isLoading } = useGetCheckInLogsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<CheckInLog>[] = [
    { key: 'time', header: 'Time', render: (r) => r.timestamp },
    { key: 'visitor', header: 'Visitor', render: (r) => <span className="font-medium">{r.visitor}</span> },
    { key: 'site', header: 'Site', render: (r) => r.site },
    { key: 'type', header: 'Type', render: (r) => <VisitorStatusBadge status={r.type === 'CHECK_IN' ? 'CHECKED_IN' : 'CHECKED_OUT'} /> },
    { key: 'visit', header: 'Visit ID', render: (r) => <span className="font-mono text-xs">{r.visitId}</span> },
    { key: 'officer', header: 'Officer', render: (r) => r.officer },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Check-In' }]} title="Check-In Desk" description="Record visitor check-in and check-out at controlled sites" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Check-In Visitor</Button>} />
      <VisitorSubNav />
      <Card className="mb-6">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-3">
          <Input label="Visit / Badge ID" defaultValue="VST-502 / BDG-7842" className="sm:col-span-2" />
          <Input label="Site" defaultValue="HQ Main Gate" />
          <div className="sm:col-span-3 flex gap-2">
            <Button onClick={() => toast('Checked in successfully')}>Check In</Button>
            <Button variant="outline" onClick={() => toast('Checked out successfully')}>Check Out</Button>
          </div>
        </CardContent>
      </Card>
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={logs as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CheckInVisitorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
