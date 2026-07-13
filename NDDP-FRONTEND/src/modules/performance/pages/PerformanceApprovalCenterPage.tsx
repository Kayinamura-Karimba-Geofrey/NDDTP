import { useState } from 'react';
import dayjs from 'dayjs';
import { useGetPendingPerformanceApprovalsQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PerformanceApproval } from '../constants/performance-data';
import { ActionPerformanceApprovalModal } from '../components/ActionPerformanceApprovalModal';

export function PerformanceApprovalCenterPage() {
  const { data: approvals = [], isLoading } = useGetPendingPerformanceApprovalsQuery();
  const [selected, setSelected] = useState<{ approval: PerformanceApproval; action: 'APPROVED' | 'REJECTED' } | null>(null);

  const columns: DataTableColumn<PerformanceApproval>[] = [
    { key: 'type', header: 'Type' },
    { key: 'ref', header: 'Reference', render: (r) => <code className="text-xs">{r.reference}</code> },
    { key: 'requester', header: 'Requester' },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submittedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
    { key: 'actions', header: '', render: (r) => (
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={() => setSelected({ approval: r, action: 'APPROVED' })}>Approve</Button>
        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setSelected({ approval: r, action: 'REJECTED' })}>Reject</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Approvals' }]} title="Approval Center" description="Reviews, development plans, PIPs, recognition, and goal changes" />
      <PerformanceSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={approvals as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <ActionPerformanceApprovalModal
        isOpen={!!selected}
        approval={selected?.approval ?? null}
        action={selected?.action ?? null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
