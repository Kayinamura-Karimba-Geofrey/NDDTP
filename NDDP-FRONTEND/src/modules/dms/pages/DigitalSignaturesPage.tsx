import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetDmsSignaturesQuery } from '../api/dms.api';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function DigitalSignaturesPage() {
  const { data: signatures = [], isLoading } = useGetDmsSignaturesQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Signatures' }]} title="Digital Signatures" description="Sequential/parallel signing, timestamps, certificate validation, signed PDF generation" />
      <DmsSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-6 lg:grid-cols-2">
          {signatures.map((s) => {
            const done = s.signatories.filter((x) => x.status === 'Signed').length;
            return (
              <Card key={s.id}>
                <CardHeader className="border-b border-border pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm">{s.document}</CardTitle>
                    <DmsStatusBadge status={s.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{s.documentNumber} · Due {dayjs(s.dueDate).format('DD MMM YYYY')} · {done} of {s.signatories.length} completed</p>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 text-sm">
                  {s.signatories.map((sig) => (
                    <div key={sig.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium">{sig.name}</p>
                        <p className="text-xs text-muted-foreground">{sig.signedAt ? dayjs(sig.signedAt).format('DD MMM HH:mm') : 'Waiting for signature'}</p>
                      </div>
                      <span className={sig.status === 'Signed' ? 'text-success' : 'text-warning'}>{sig.status}</span>
                    </div>
                  ))}
                  {s.status === 'PENDING_SIGNATURE' && (
                    <Button size="sm" variant="outline" onClick={() => toast('Reminder sent')}>Send Reminder</Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
